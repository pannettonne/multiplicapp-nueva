import React, { useState, useEffect } from 'react';
import { GameState, Question } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameOptions } from './GameOptions';
import './Game.css';

interface GameProps {
  mode: 'learning' | 'challenge';
  level: number;
  responseType: 'multiple-choice' | 'write';
  onGameEnd: () => void;
}

interface VictoryBadge {
  id: string;
  emoji: string;
  text: string;
  color: string;
}

const victoryBadges: { [key: number]: VictoryBadge } = {
  3: { id: '3', emoji: '🌟', text: 'Racha de 3', color: '#FFD700' },
  5: { id: '5', emoji: '⭐', text: 'Racha de 5', color: '#FF6B9D' },
  10: { id: '10', emoji: '💫', text: 'Racha de 10', color: '#00D4FF' },
  15: { id: '15', emoji: '🏆', text: 'Racha de 15', color: '#FF1744' },
  25: { id: '25', emoji: '👑', text: 'Racha de 25', color: '#FFD700' },
};

const StreakMilestones: { [key: number]: string } = {
  3: '🌟 ¡Vas bien!',
  5: '⭐ ¡Increíble!',
  10: '💫 ¡Fantástico!',
  15: '🏆 ¡Legendario!',
  25: '👑 ¡ÉPICO!',
};

export const Game: React.FC<GameProps> = ({ mode, level, responseType, onGameEnd }) => {
  const { gameState, startLearningMode, startChallengeMode, submitAnswer, decrementTime } = useGameLogic();
  const [userInput, setUserInput] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<VictoryBadge | null>(null);
  const [particleList, setParticleList] = useState<Array<{id: number, x: number, y: number}>>([]);

  const generateMultipleChoiceOptions = (question: Question) => {
    const correctAnswer = question.answer;
    const options = new Set<number>();
    options.add(correctAnswer);
    
    while (options.size < 4) {
      const wrong = Math.floor(Math.random() * (correctAnswer + 15)) + Math.max(1, correctAnswer - 10);
      if (wrong !== correctAnswer) {
        options.add(wrong);
      }
    }
    
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const handleSubmitMultiple = (answer: number) => {
    const result = submitAnswer(answer.toString());

    if (result.isCorrect) {
      setIsCorrect(true);
      
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 50,
      }));
      setParticleList(newParticles);
      
      setShowVictoryAnimation(true);
      
      const streakMilestone = Object.keys(victoryBadges)
        .map(Number)
        .find(milestone => result.streak === milestone);
      
      if (streakMilestone && victoryBadges[streakMilestone]) {
        setUnlockedBadge(victoryBadges[streakMilestone]);
      }
      
      let message = `🎉 ¡Correcto! +${result.pointsEarned} puntos`;
      if (result.streak > 1) {
        const milestone = StreakMilestones[result.streak as keyof typeof StreakMilestones];
        message += `\n${milestone} 🔥 Racha: ${result.streak}`;
      }
      setFeedbackMessage(message);
    } else {
      setIsCorrect(false);
      if (gameState.currentQuestion) {
        setFeedbackMessage(`❌ Incorrecto. ${gameState.currentQuestion.a} × ${gameState.currentQuestion.b} = ${gameState.currentQuestion.answer}`);
      }
    }

    setShowFeedback(true);
    setUserInput('');

    setTimeout(() => {
      setShowFeedback(false);
      setShowVictoryAnimation(false);
      setUnlockedBadge(null);
      
      if (gameState.gameOver) {
        onGameEnd();
      }
    }, 2000);
  };

  useEffect(() => {
    if (mode === 'learning') {
      startLearningMode(level);
    } else {
      startChallengeMode(level);
    }
  }, [mode, level, startLearningMode, startChallengeMode]);

  // Timer para retos rápidos
  useEffect(() => {
    if (mode !== 'challenge' || gameState.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, gameState.timeRemaining, decrementTime]);

  // Game over cuando se acaban vidas o tiempo
  useEffect(() => {
    if ((mode === 'learning' && gameState.lives <= 0) || 
        (mode === 'challenge' && gameState.timeRemaining <= 0)) {
      setTimeout(() => {
        onGameEnd();
      }, 2000);
    }
  }, [gameState.lives, gameState.timeRemaining, mode, onGameEnd]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !gameState.currentQuestion) return;

    const result = submitAnswer(userInput);
    const userAnswerNum = parseInt(userInput);

    if (result.isCorrect) {
      setIsCorrect(true);
      
      // Crear confeti/partículas
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 50,
      }));
      setParticleList(newParticles);
      
      // Animación de victoria
      setShowVictoryAnimation(true);
      
      // Verificar logros por racha
      const streakMilestone = Object.keys(victoryBadges)
        .map(Number)
        .find(milestone => result.streak === milestone);
      
      if (streakMilestone && victoryBadges[streakMilestone]) {
        setUnlockedBadge(victoryBadges[streakMilestone]);
      }
      
      // Mensaje personalizado por racha
      let message = `🎉 ¡Correcto! +${result.pointsEarned} puntos`;
      if (result.streak > 1) {
        const milestone = StreakMilestones[result.streak as keyof typeof StreakMilestones];
        message += `\n${milestone} 🔥 Racha: ${result.streak}`;
      }
      setFeedbackMessage(message);
    } else {
      setIsCorrect(false);
      setFeedbackMessage(`❌ Incorrecto. ${gameState.currentQuestion.a} × ${gameState.currentQuestion.b} = ${gameState.currentQuestion.answer}`);
    }

    setShowFeedback(true);
    setUserInput('');

    // Limpiar animación
    setTimeout(() => {
      setShowFeedback(false);
      setShowVictoryAnimation(false);
      setUnlockedBadge(null);
      setParticleList([]);
    }, 2500);
  };

  if (!gameState.currentQuestion) {
    return <div className="game-loading">Cargando...</div>;
  }

  const levelNames = {
    1: 'Tablas 1-5',
    2: 'Tablas 6-7',
    3: 'Tablas 8-9',
    4: 'Tablas 1-10'
  };

  return (
    <div className={`game-container ${mode}`}>
      <div className="game-header">
        <div className="game-info">
          <span className="game-level">{levelNames[level as keyof typeof levelNames]}</span>
          <span className="game-score">Puntos: {gameState.score}</span>
        </div>

        <div className="game-stats">
          {mode === 'learning' ? (
            <div className="lives-display">
              {Array.from({ length: gameState.lives }).map((_, i) => (
                <span key={i} className="heart">❤️</span>
              ))}
            </div>
          ) : (
            <div className="timer">
              <span className={gameState.timeRemaining < 10 ? 'time-critical' : ''}>
                ⏱️ {gameState.timeRemaining}s
              </span>
            </div>
          )}
          <span className="streak">🔥 {gameState.streak}</span>
        </div>
      </div>

      <div className="question-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(gameState.questionsAnswered / (gameState.mode === 'challenge' ? 15 : 20)) * 100}%` }}
          />
        </div>

        <div className="question">
          <h2>{gameState.currentQuestion.a} × {gameState.currentQuestion.b} = ?</h2>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          {responseType === 'multiple-choice' ? (
            <div className="multiple-choice-options">
              {gameState.currentQuestion && generateMultipleChoiceOptions(gameState.currentQuestion).map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`option-btn ${userInput === option.toString() ? 'selected' : ''}`}
                  onClick={() => {
                    setUserInput(option.toString());
                    setTimeout(() => {
                      handleSubmitMultiple(option);
                    }, 100);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <>
              <input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe tu respuesta"
                autoFocus
                min="0"
              />
              <button type="submit" disabled={!userInput.trim()}>
                Responder
              </button>
            </>
          )}
        </form>

        {showFeedback && (
          <>
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p style={{ whiteSpace: 'pre-line' }}>{feedbackMessage}</p>
              {!isCorrect && gameState.currentQuestion && (
                <div className="technique">
                  <p className="technique-title">💡 Aprende esto:</p>
                  <p>{gameState.currentQuestion.technique}</p>
                </div>
              )}
            </div>

            {isCorrect && (
              <>
                {showVictoryAnimation && (
                  <div className="victory-animation">
                    <div className="explosion-circle"></div>
                    <div className="star-burst">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} className="star" style={{
                          '--angle': `${(i * 360) / 8}deg`,
                        } as React.CSSProperties}>⭐</span>
                      ))}
                    </div>
                  </div>
                )}

                {unlockedBadge && (
                  <div className="badge-unlock-animation">
                    <div className="badge-container" style={{ borderColor: unlockedBadge.color }}>
                      <div className="badge-emoji">{unlockedBadge.emoji}</div>
                      <p className="badge-text">{unlockedBadge.text}</p>
                      <p className="badge-subtitle">¡Logro Desbloqueado!</p>
                    </div>
                  </div>
                )}

                {particleList.length > 0 && (
                  <div className="particles">
                    {particleList.map(particle => (
                      <div
                        key={particle.id}
                        className="particle"
                        style={{
                          left: `${particle.x}%`,
                          top: `${particle.y}%`,
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div className="progress-info">
          <span>Preguntas: {gameState.questionsAnswered}</span>
          <span>Correctas: {gameState.correctAnswers}</span>
          <span>Precisión: {gameState.questionsAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100) : 0}%</span>
        </div>

        <div className="answers-history">
          {gameState.answers.split('').map((answer, idx) => (
            <span 
              key={idx}
              className={`answer-dot ${answer === '✓' ? 'correct' : 'incorrect'}`}
              title={answer === '✓' ? 'Correcto' : 'Incorrecto'}
            >
              {answer}
            </span>
          ))}
        </div>
      </div>

      {gameState.lives <= 0 || gameState.timeRemaining <= 0 ? (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <h2>🎮 ¡Fin del Juego!</h2>
            <p>Puntuación Final: <strong>{gameState.score}</strong></p>
            <p>Precisión: <strong>{gameState.questionsAnswered > 0 ? Math.round((gameState.correctAnswers / gameState.questionsAnswered) * 100) : 0}%</strong></p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
