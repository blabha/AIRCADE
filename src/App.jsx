import React, { useEffect } from "react";
import { useGameState, SCREENS } from "./hooks/useGameState";
import { useSounds } from "./hooks/useSounds";
import { INDUSTRIES } from "./data/industries";
import { QUESTIONS } from "./data/questions";

import LanguageSelect     from "./components/LanguageSelect";
import Welcome            from "./components/Welcome";
import PlayerRegistration from "./components/PlayerRegistration";
import PathMap            from "./components/PathMap";
import QuestionScreen     from "./components/QuestionScreen";
import TransitionScreen   from "./components/TransitionScreen";
import ResultsTicket      from "./components/ResultsTicket";

export default function App() {
  const {
    state, setLang, goToScreen, setPlayer,
    startGame, answerQuestion, nextQuestion, resetGame, debugSkip,
  } = useGameState();
  const { play } = useSounds();

  // Ctrl+Shift+D → debug skip to results
  useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key === "D") debugSkip(INDUSTRIES);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [debugSkip]);

  const {
    screen, lang, player, currentQuestion,
    answers, score, totalEnergy, totalWater, totalCo2,
    sessionId, persona, smartTip, lastDelta,
  } = state;

  switch (screen) {
    case SCREENS.LANGUAGE_SELECT:
      return (
        <LanguageSelect
          onSelect={(l) => { setLang(l); goToScreen(SCREENS.WELCOME); }}
          play={play}
        />
      );

    case SCREENS.WELCOME:
      return (
        <Welcome
          lang={lang}
          onStart={() => goToScreen(SCREENS.PLAYER_REGISTRATION)}
          play={play}
        />
      );

    case SCREENS.PLAYER_REGISTRATION:
      return (
        <PlayerRegistration
          lang={lang}
          player={player}
          setPlayer={setPlayer}
          onStart={startGame}
          play={play}
        />
      );

    case SCREENS.PATH_MAP:
      return (
        <PathMap
          lang={lang}
          completedCount={answers.length}
          score={score}
          onGo={() => goToScreen(SCREENS.QUESTION)}
          showComplete={false}
        />
      );

    case SCREENS.QUESTION:
      return (
        <QuestionScreen
          lang={lang}
          questionIndex={currentQuestion}
          totalEnergy={totalEnergy}
          totalWater={totalWater}
          totalCo2={totalCo2}
          score={score}
          onAnswer={answerQuestion}
          play={play}
        />
      );

    case SCREENS.TRANSITION: {
      const completedSoFar = answers.length;
      const isLast = completedSoFar >= QUESTIONS.length;
      return (
        <TransitionScreen
          lang={lang}
          completedCount={completedSoFar}
          lastDelta={lastDelta}
          onContinue={() => {
            if (isLast) goToScreen(SCREENS.RESULTS);
            else        nextQuestion();
          }}
          play={play}
        />
      );
    }

    case SCREENS.RESULTS:
      return (
        <ResultsTicket
          lang={lang}
          player={player}
          persona={persona}
          score={score}
          totalEnergy={totalEnergy}
          totalWater={totalWater}
          totalCo2={totalCo2}
          sessionId={sessionId}
          smartTip={smartTip}
          answers={answers}
          onPlayAgain={resetGame}
          play={play}
        />
      );

    default:
      return null;
  }
}
