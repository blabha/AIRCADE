import { useReducer, useCallback } from "react";
import { QUESTIONS } from "../data/questions";
import { getPersona } from "../data/personas";
import { getSmartTip } from "../data/industries";

export const SCREENS = {
  LANGUAGE_SELECT: 0,
  WELCOME: 1,
  PLAYER_REGISTRATION: 2,
  PATH_MAP: 3,
  QUESTION: 4,
  TRANSITION: 5,
  RESULTS: 6,
};

/**
 * New scoring system — range per question: -3 to +4
 * Total range over 5 questions: -15 to +20
 *
 * weight 1 → -3  (heavy AI, terrible environmental choice)
 * weight 2 → -1  (high AI use)
 * weight 3 → +1  (moderate use)
 * weight 4 → +2  (good choice)
 * weight 5 → +3  (great choice)
 * weight 6 → +4  (zero footprint, perfect)
 */
export function scoreForWeight(weight) {
  const map = { 1: -3, 2: -1, 3: 1, 4: 2, 5: 3, 6: 4 };
  return map[weight] ?? 0;
}

export const MAX_SCORE = 20; // 5 × 4

const INITIAL_STATE = {
  screen: SCREENS.LANGUAGE_SELECT,
  lang: "en",
  player: {
    name: "",
    age: "",
    gender: "",
    industry: "",
  },
  currentQuestion: 0,
  answers: [],
  score: 0,
  totalEnergy: 0,
  totalWater: 0,
  totalCo2: 0,
  sessionId: "",
  persona: null,
  smartTip: "",
  lastDelta: null,   // score delta from the last answer (+4, -3, etc.)
};

function generateSessionId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function gameReducer(state, action) {
  switch (action.type) {
    case "SET_LANG":
      return { ...state, lang: action.lang };

    case "GO_TO_SCREEN":
      return { ...state, screen: action.screen };

    case "SET_PLAYER":
      return { ...state, player: { ...state.player, ...action.player } };

    case "START_GAME":
      return {
        ...state,
        screen: SCREENS.PATH_MAP,
        currentQuestion: 0,
        answers: [],
        score: 0,
        totalEnergy: 0,
        totalWater: 0,
        totalCo2: 0,
        sessionId: generateSessionId(),
        persona: null,
        smartTip: "",
        lastDelta: null,
      };

    case "ANSWER_QUESTION": {
      const option   = action.option;
      const delta    = scoreForWeight(option.weight);
      const newScore = state.score + delta;
      const newEnergy = state.totalEnergy + option.energyWh;
      const newWater  = state.totalWater  + option.waterMl;
      const newCo2    = state.totalCo2    + option.co2g;
      const newAnswers = [...state.answers, option];
      const isLast = state.currentQuestion >= QUESTIONS.length - 1;

      if (isLast) {
        const persona = getPersona(newScore);
        const tip = getSmartTip(state.player.industry, persona.id, state.lang);
        return {
          ...state,
          answers: newAnswers,
          score: newScore,
          totalEnergy: newEnergy,
          totalWater:  newWater,
          totalCo2:    newCo2,
          screen: SCREENS.TRANSITION,
          persona,
          smartTip: tip,
          lastDelta: delta,
        };
      }

      return {
        ...state,
        answers: newAnswers,
        score: newScore,
        totalEnergy: newEnergy,
        totalWater:  newWater,
        totalCo2:    newCo2,
        screen: SCREENS.TRANSITION,
        lastDelta: delta,
      };
    }

    case "NEXT_QUESTION":
      if (state.currentQuestion >= QUESTIONS.length - 1) {
        return { ...state, screen: SCREENS.RESULTS };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        screen: SCREENS.QUESTION,
      };

    case "DEBUG_SKIP": {
      const randomScore = Math.floor(Math.random() * 36) - 15; // -15 to +20
      const clamped = Math.max(-15, Math.min(MAX_SCORE, randomScore));
      const persona = getPersona(clamped);
      const industry = action.industries[Math.floor(Math.random() * action.industries.length)];
      const tip = getSmartTip(industry, persona.id, state.lang);
      return {
        ...state,
        screen: SCREENS.RESULTS,
        player: {
          name: "DEMO PLAYER",
          age: "25",
          gender: "Prefer not to say",
          industry,
        },
        answers: QUESTIONS.map((q) => q.options[Math.floor(Math.random() * 3)]),
        score: clamped,
        totalEnergy: parseFloat((Math.random() * 60).toFixed(2)),
        totalWater:  parseFloat((Math.random() * 800).toFixed(0)),
        totalCo2:    parseFloat((Math.random() * 50).toFixed(2)),
        sessionId:   generateSessionId(),
        currentQuestion: QUESTIONS.length - 1,
        persona,
        smartTip: tip,
        lastDelta: null,
      };
    }

    case "RESET":
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const setLang       = useCallback((lang)       => dispatch({ type: "SET_LANG", lang }),          []);
  const goToScreen    = useCallback((screen)     => dispatch({ type: "GO_TO_SCREEN", screen }),    []);
  const setPlayer     = useCallback((player)     => dispatch({ type: "SET_PLAYER", player }),      []);
  const startGame     = useCallback(()           => dispatch({ type: "START_GAME" }),              []);
  const answerQuestion= useCallback((option)     => dispatch({ type: "ANSWER_QUESTION", option }),  []);
  const nextQuestion  = useCallback(()           => dispatch({ type: "NEXT_QUESTION" }),           []);
  const resetGame     = useCallback(()           => dispatch({ type: "RESET" }),                   []);
  const debugSkip     = useCallback((industries) => dispatch({ type: "DEBUG_SKIP", industries }),  []);

  return {
    state,
    setLang,
    goToScreen,
    setPlayer,
    startGame,
    answerQuestion,
    nextQuestion,
    resetGame,
    debugSkip,
    SCREENS,
  };
}
