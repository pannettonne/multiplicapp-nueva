import { useState, useCallback, useEffect } from 'react';
import { GameState, Question } from './types';
import { QuestionGenerator } from './questionGenerator';
import { gameDB } from './db';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    mode: 'menu',
    level: 1,
    currentQuestion: null,
    score: 0,
    lives: 3,
    streak: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    timeRemaining: 60,
    answers: ''
  });

  const startLearningMode = useCallback((level: number) => {
    const question = QuestionGenerator.generateQuestion(level);
    setGameState(prev => ({
      ...prev,
      mode: 'learning',
      level,
      currentQuestion: question,
      score: 0,
      lives: 5,
      streak: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      answers: ''
    }));
  }, []);

  const startChallengeMode = useCallback((level: number) => {
    const question = QuestionGenerator.generateQuestion(level);
    setGameState(prev => ({
      ...prev,
      mode: 'challenge',
      level,
      currentQuestion: question,
      score: 0,
      lives: 3,
      streak: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeRemaining: 60,
      answers: ''
    }));
  }, []);

  const submitAnswer = useCallback((userAnswer: string) => {
    if (!gameState.currentQuestion) return;

    const isCorrect = parseInt(userAnswer) === gameState.currentQuestion.answer;
    const newQuestionsAnswered = gameState.questionsAnswered + 1;
    const newCorrectAnswers = gameState.correctAnswers + (isCorrect ? 1 : 0);
    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const pointsEarned = isCorrect ? (10 + gameState.streak * 2) : 0;
    const newScore = gameState.score + pointsEarned;

    const newLives = isCorrect ? gameState.lives : gameState.lives - 1;

    const nextQuestion = QuestionGenerator.generateQuestion(gameState.level);

    setGameState(prev => ({
      ...prev,
      score: newScore,
      lives: newLives,
      streak: newStreak,
      questionsAnswered: newQuestionsAnswered,
      correctAnswers: newCorrectAnswers,
      currentQuestion: nextQuestion,
      answers: prev.answers + (isCorrect ? '✓' : '✗')
    }));

    return {
      isCorrect,
      pointsEarned,
      gameOver: newLives <= 0,
      question: gameState.currentQuestion,
      streak: newStreak
    };
  }, [gameState]);

  const gameOver = useCallback(async () => {
    const accuracy = gameState.questionsAnswered > 0
      ? (gameState.correctAnswers / gameState.questionsAnswered) * 100
      : 0;

    await gameDB.saveGameStats({
      mode: gameState.mode as 'learning' | 'challenge',
      level: gameState.level,
      correctAnswers: gameState.correctAnswers,
      totalQuestions: gameState.questionsAnswered,
      timeSpent: gameState.mode === 'challenge' ? 60 - gameState.timeRemaining : 0,
      score: gameState.score,
      accuracy
    });

    setGameState(prev => ({
      ...prev,
      mode: 'menu'
    }));
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      mode: 'menu',
      level: 1,
      currentQuestion: null,
      score: 0,
      lives: 3,
      streak: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeRemaining: 60,
      answers: ''
    });
  }, []);

  const decrementTime = useCallback(() => {
    setGameState(prev => {
      const newTime = prev.timeRemaining - 1;
      if (newTime <= 0 && prev.mode === 'challenge') {
        gameOver();
        return prev;
      }
      return { ...prev, timeRemaining: newTime };
    });
  }, [gameOver]);

  return {
    gameState,
    startLearningMode,
    startChallengeMode,
    submitAnswer,
    gameOver,
    resetGame,
    decrementTime
  };
}
