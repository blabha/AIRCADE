"""
database.py — SQLite setup and all query helpers.

The database lives in backend/aircade.db and is created automatically
on first startup. No migrations needed — just delete the file to reset.

Schema
------
sessions   — one row per completed game (all player data + results)
answers    — one row per answer given, linked to a session
"""

import sqlite3
import os
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(__file__), "aircade.db")


# ── connection helper ──────────────────────────────────────────────────────────

@contextmanager
def get_db():
    """Yield a connection with row_factory so rows behave like dicts."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")   # safe for concurrent reads
    conn.execute("PRAGMA foreign_keys=ON")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


# ── schema creation ────────────────────────────────────────────────────────────

CREATE_SESSIONS = """
CREATE TABLE IF NOT EXISTS sessions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id   TEXT    NOT NULL UNIQUE,   -- 6-char alphanumeric from frontend
    lang         TEXT    NOT NULL,
    player_name  TEXT    NOT NULL,
    age          INTEGER,
    gender       TEXT,
    industry     TEXT,
    score        INTEGER NOT NULL,
    persona_id   TEXT    NOT NULL,
    persona_name TEXT    NOT NULL,
    total_energy REAL    NOT NULL,
    total_water  REAL    NOT NULL,
    total_co2    REAL    NOT NULL,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
"""

CREATE_ANSWERS = """
CREATE TABLE IF NOT EXISTS answers (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id   TEXT    NOT NULL REFERENCES sessions(session_id),
    question_num INTEGER NOT NULL,   -- 1-based
    option_label TEXT    NOT NULL,   -- A / B / C
    option_text  TEXT    NOT NULL,
    energy_wh    REAL    NOT NULL,
    water_ml     REAL    NOT NULL,
    co2_g        REAL    NOT NULL,
    weight       INTEGER NOT NULL
);
"""

def init_db():
    """Create tables if they don't exist yet."""
    with get_db() as conn:
        conn.execute(CREATE_SESSIONS)
        conn.execute(CREATE_ANSWERS)
    print(f"[db] ready — {DB_PATH}")


# ── write helpers ──────────────────────────────────────────────────────────────

def insert_session(data: dict) -> int:
    """Insert a session row; return the new row id."""
    sql = """
        INSERT INTO sessions
            (session_id, lang, player_name, age, gender, industry,
             score, persona_id, persona_name,
             total_energy, total_water, total_co2)
        VALUES
            (:session_id, :lang, :player_name, :age, :gender, :industry,
             :score, :persona_id, :persona_name,
             :total_energy, :total_water, :total_co2)
    """
    with get_db() as conn:
        cur = conn.execute(sql, data)
        return cur.lastrowid


def insert_answers(session_id: str, answers: list[dict]):
    """Bulk-insert answer rows."""
    sql = """
        INSERT INTO answers
            (session_id, question_num, option_label, option_text,
             energy_wh, water_ml, co2_g, weight)
        VALUES
            (:session_id, :question_num, :option_label, :option_text,
             :energy_wh, :water_ml, :co2_g, :weight)
    """
    with get_db() as conn:
        conn.executemany(sql, [{"session_id": session_id, **a} for a in answers])


# ── read helpers ───────────────────────────────────────────────────────────────

def fetch_sessions(limit: int = 100, offset: int = 0,
                   industry: str | None = None,
                   persona_id: str | None = None) -> list[dict]:
    clauses = []
    params: dict = {"limit": limit, "offset": offset}

    if industry:
        clauses.append("industry = :industry")
        params["industry"] = industry
    if persona_id:
        clauses.append("persona_id = :persona_id")
        params["persona_id"] = persona_id

    where = ("WHERE " + " AND ".join(clauses)) if clauses else ""
    sql = f"""
        SELECT * FROM sessions
        {where}
        ORDER BY created_at DESC
        LIMIT :limit OFFSET :offset
    """
    with get_db() as conn:
        rows = conn.execute(sql, params).fetchall()
    return [dict(r) for r in rows]


def fetch_session_by_id(session_id: str) -> dict | None:
    with get_db() as conn:
        row = conn.execute(
            "SELECT * FROM sessions WHERE session_id = ?", (session_id,)
        ).fetchone()
        if row is None:
            return None
        answers = conn.execute(
            "SELECT * FROM answers WHERE session_id = ? ORDER BY question_num",
            (session_id,)
        ).fetchall()
    return {**dict(row), "answers": [dict(a) for a in answers]}


def fetch_stats() -> dict:
    with get_db() as conn:
        total = conn.execute("SELECT COUNT(*) FROM sessions").fetchone()[0]
        if total == 0:
            return {"total_sessions": 0}

        avg_score = conn.execute("SELECT AVG(score) FROM sessions").fetchone()[0]
        avg_energy = conn.execute("SELECT AVG(total_energy) FROM sessions").fetchone()[0]
        avg_water  = conn.execute("SELECT AVG(total_water)  FROM sessions").fetchone()[0]
        avg_co2    = conn.execute("SELECT AVG(total_co2)    FROM sessions").fetchone()[0]

        personas = conn.execute("""
            SELECT persona_id, COUNT(*) as count
            FROM sessions GROUP BY persona_id ORDER BY count DESC
        """).fetchall()

        industries = conn.execute("""
            SELECT industry, COUNT(*) as count
            FROM sessions GROUP BY industry ORDER BY count DESC LIMIT 10
        """).fetchall()

        score_dist = conn.execute("""
            SELECT
                CASE
                    WHEN score BETWEEN 5  AND 10 THEN 'turbo'
                    WHEN score BETWEEN 11 AND 16 THEN 'casual'
                    WHEN score BETWEEN 17 AND 22 THEN 'mindful'
                    ELSE 'green'
                END as band,
                COUNT(*) as count
            FROM sessions GROUP BY band
        """).fetchall()

    return {
        "total_sessions": total,
        "avg_score":      round(avg_score, 2),
        "avg_energy_wh":  round(avg_energy, 4),
        "avg_water_ml":   round(avg_water, 2),
        "avg_co2_g":      round(avg_co2, 4),
        "persona_distribution": [dict(r) for r in personas],
        "top_industries":       [dict(r) for r in industries],
        "score_bands":          [dict(r) for r in score_dist],
    }
