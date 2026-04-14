"""
main.py — (AI)RCADE FastAPI backend

Run:
    uvicorn main:app --reload --port 8000

Interactive docs (great for tinkering):
    http://localhost:8000/docs      ← Swagger UI
    http://localhost:8000/redoc     ← ReDoc
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from database import init_db, insert_session, insert_answers, \
                     fetch_sessions, fetch_session_by_id, fetch_stats
from models import SessionIn, SessionOut, SessionDetail, StatsOut

# ── App setup ──────────────────────────────────────────────────────────────────

app = FastAPI(
    title="(AI)RCADE API",
    description="Backend for the (AI)RCADE browser kiosk game.\n\n"
                "Every completed game session is saved here along with "
                "the player's answers, footprint totals, and assigned persona.",
    version="1.0.0",
)

# Allow the Vite dev server (port 5173) and any local origin to call this API.
# Tighten this for production by replacing "*" with your actual domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/health", tags=["Meta"])
def health():
    """Quick liveness check."""
    return {"status": "ok", "service": "(AI)RCADE API"}


# ---------- Sessions ----------

@app.post("/sessions", response_model=SessionOut, status_code=201, tags=["Sessions"])
def create_session(body: SessionIn):
    """
    Save a completed game session.

    Called automatically by the frontend when the Results screen loads.
    The `answers` array must contain exactly 5 entries (one per question).
    """
    data = body.model_dump(exclude={"answers"})
    row_id = insert_session(data)
    insert_answers(body.session_id, [a.model_dump() for a in body.answers])

    # Return the saved row
    saved = fetch_session_by_id(body.session_id)
    if saved is None:
        raise HTTPException(500, "Session saved but could not be retrieved")
    return saved


@app.get("/sessions", response_model=list[SessionOut], tags=["Sessions"])
def list_sessions(
    limit:      int          = Query(50,   ge=1, le=500),
    offset:     int          = Query(0,    ge=0),
    industry:   str | None   = Query(None, description="Filter by industry name"),
    persona_id: str | None   = Query(None, description="Filter by persona: turbo | casual | mindful | green"),
):
    """
    List saved sessions, newest first.

    Use `industry` or `persona_id` query params to filter.
    """
    return fetch_sessions(limit=limit, offset=offset, industry=industry, persona_id=persona_id)


@app.get("/sessions/{session_id}", response_model=SessionDetail, tags=["Sessions"])
def get_session(session_id: str):
    """
    Retrieve a single session by its 6-char session ID,
    including the full answer breakdown.
    """
    row = fetch_session_by_id(session_id)
    if row is None:
        raise HTTPException(404, f"Session '{session_id}' not found")
    return row


@app.delete("/sessions/{session_id}", status_code=204, tags=["Sessions"])
def delete_session(session_id: str):
    """Delete a session and all its answers. Useful during testing."""
    from database import get_db
    with get_db() as conn:
        conn.execute("DELETE FROM answers WHERE session_id = ?", (session_id,))
        result = conn.execute(
            "DELETE FROM sessions WHERE session_id = ?", (session_id,)
        )
    if result.rowcount == 0:
        raise HTTPException(404, f"Session '{session_id}' not found")


# ---------- Stats ----------

@app.get("/stats", response_model=StatsOut, tags=["Stats"])
def get_stats():
    """
    Aggregate stats across all sessions:
    - Total players
    - Average score, energy, water, CO₂
    - Persona distribution
    - Top industries
    - Score band breakdown
    """
    return fetch_stats()
