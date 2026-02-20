import React, { useState, useEffect } from 'react';
import { PlayerProgress, GameStats } from '../types';
import { gameDB } from '../db';
import './Menu.css';

interface MenuProps {
  onSelectMode: (mode: 'learning' | 'challenge', level: number) => void;
  onViewTables: () => void;
  onLearn: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onSelectMode, onViewTables, onLearn }) => {
  const [progress, setProgress] = useState<PlayerProgress | null>(null);
  const [recentStats, setRecentStats] = useState<GameStats[]>([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const prog = await gameDB.getPlayerProgress();
    const stats = await gameDB.getGameStats(5);
    setProgress(prog);
    setRecentStats(stats);
  };

  const levels = [
    { id: 1, name: 'Tablas 1-5', emoji: '🌱' },
    { id: 2, name: 'Tablas 6-7', emoji: '🌿' },
    { id: 3, name: 'Tablas 8-9', emoji: '🌳' },
    { id: 4, name: 'Tablas 1-10', emoji: '🎯' }
  ];

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>🧮 MultiplicaApp</h1>
        <p>¡Aprende las tablas de multiplicar!</p>
      </div>

      {progress && (
        <div className="stats-card">
          <div className="stat-item">
            <span className="stat-label">Puntuación Total</span>
            <span className="stat-value">{progress.totalScore}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Precisión</span>
            <span className="stat-value">
              {progress.totalQuestions > 0
                ? Math.round((progress.totalCorrect / progress.totalQuestions) * 100)
                : 0}%
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Racha 🔥</span>
            <span className="stat-value">{progress.currentStreak}</span>
          </div>
        </div>
      )}

      <div className="mode-selector">
        <h2>Elige Modo de Juego</h2>
        
        <div className="mode-buttons">
          <button 
            className="mode-btn learning-btn"
            onClick={() => onSelectMode('learning', 1)}
          >
            <span className="mode-icon">📚</span>
            <span className="mode-title">Aprendizaje</span>
            <span className="mode-desc">Sin presión, con explicaciones</span>
          </button>
          <button 
            className="mode-btn challenge-btn"
            onClick={() => onSelectMode('challenge', 1)}
          >
            <span className="mode-icon">⏱️</span>
            <span className="mode-title">Reto Rápido</span>
            <span className="mode-desc">60 segundos de velocidad</span>
          </button>
        </div>

        <div className="extra-buttons">
          <button 
            className="extra-btn tables-btn"
            onClick={onViewTables}
          >
            <span className="extra-icon">📊</span>
            <span className="extra-title">Ver Tablas</span>
            <span className="extra-desc">Consulta las tablas</span>
          </button>
          <button 
            className="extra-btn learn-btn"
            onClick={onLearn}
          >
            <span className="extra-icon">🎓</span>
            <span className="extra-title">Aprende</span>
            <span className="extra-desc">Trucos y curiosidades</span>
          </button>
        </div>
      </div>

      <div className="levels-grid">
        <h2>Selecciona tu Nivel</h2>
        <div className="levels">
          {levels.map(level => (
            <div key={level.id} className="level-option">
              <button 
                className="level-btn"
                onClick={() => onSelectMode('learning', level.id)}
              >
                <span className="level-emoji">{level.emoji}</span>
                <span className="level-name">{level.name}</span>
              </button>
              <button 
                className="level-challenge-btn"
                onClick={() => onSelectMode('challenge', level.id)}
              >
                ⚡
              </button>
            </div>
          ))}
        </div>
      </div>

      {recentStats.length > 0 && (
        <div className="recent-games">
          <h3>Últimos Juegos</h3>
          <div className="games-list">
            {recentStats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="game-item">
                <span className="game-mode">
                  {stat.mode === 'learning' ? '📚' : '⏱️'}
                </span>
                <span className="game-accuracy">
                  {Math.round(stat.accuracy)}% correcto
                </span>
                <span className="game-score">{stat.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
