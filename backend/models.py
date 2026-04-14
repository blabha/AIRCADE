"""
models.py — Pydantic request/response shapes.

Tweak these freely; FastAPI will auto-validate and update /docs.
"""

from pydantic import BaseModel, Field
from typing import Optional


class AnswerIn(BaseModel):
    question_num: int          = Field(..., ge=1, le=5)
    option_label: str          = Field(..., pattern="^[ABC]$")
    option_text:  str
    energy_wh:    float        = Field(..., ge=0)
    water_ml:     float        = Field(..., ge=0)
    co2_g:        float        = Field(..., ge=0)
    weight:       int          = Field(..., ge=1, le=6)


class SessionIn(BaseModel):
    session_id:   str          = Field(..., min_length=6, max_length=6)
    lang:         str          = Field(..., pattern="^(en|es)$")
    player_name:  str          = Field(..., min_length=1, max_length=60)
    age:          Optional[int]= Field(None, ge=1, le=120)
    gender:       Optional[str]= None
    industry:     Optional[str]= None
    score:        int          = Field(..., ge=0, le=30)
    persona_id:   str          # turbo | casual | mindful | green
    persona_name: str
    total_energy: float        = Field(..., ge=0)
    total_water:  float        = Field(..., ge=0)
    total_co2:    float        = Field(..., ge=0)
    answers:      list[AnswerIn]


class SessionOut(BaseModel):
    id:           int
    session_id:   str
    lang:         str
    player_name:  str
    age:          Optional[int]
    gender:       Optional[str]
    industry:     Optional[str]
    score:        int
    persona_id:   str
    persona_name: str
    total_energy: float
    total_water:  float
    total_co2:    float
    created_at:   str

    model_config = {"from_attributes": True}


class SessionDetail(SessionOut):
    answers: list[dict]


class StatsOut(BaseModel):
    total_sessions:        int
    avg_score:             Optional[float] = None
    avg_energy_wh:         Optional[float] = None
    avg_water_ml:          Optional[float] = None
    avg_co2_g:             Optional[float] = None
    persona_distribution:  list[dict]      = []
    top_industries:        list[dict]      = []
    score_bands:           list[dict]      = []
