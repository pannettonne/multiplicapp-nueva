import React, { useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { Game } from './components/Game';
import { Tables } from './components/Tables';
import { Learn } from './components/Learn';
import { ResponseMode } from './components/ResponseMode';
import { gameDB } from './db';
import './App.css';

type AppState = 'menu' | 'response-mode' | 'game-learning' | 'game-challenge' | 'tables' | 'learn';

interface GameSession {
  mode: 'learning' | 'challenge';
  level: number;
  responseType: 'multiple-choice' | 'write';
}

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  useEffect(() => {
    // Inicializar base de datos
    gameDB.init();

    // Registrar service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
      });
    }
  }, []);

  const handleSelectMode = (mode: 'learning' | 'challenge', level: number) => {
    setGameSession({ mode, level, responseType: 'multiple-choice' });
    setAppState('response-mode');
  };

  const handleSelectResponseType = (responseType: 'multiple-choice' | 'write') => {
    if (gameSession) {
      setGameSession({ ...gameSession, responseType });
      setAppState(gameSession.mode === 'learning' ? 'game-learning' : 'game-challenge');
    }
  };

  const handleGameEnd = () => {
    setAppState('menu');
    setGameSession(null);
  };

  const handleBack = () => {
    setAppState('menu');
  };

  return (
    <div className="app">
      {appState === 'menu' && (
        <Menu 
          onSelectMode={handleSelectMode}
          onViewTables={() => setAppState('tables')}
          onLearn={() => setAppState('learn')}
        />
      )}
      {appState === 'response-mode' && gameSession && (
        <ResponseMode 
          onSelectMode={handleSelectResponseType}
          onBack={handleBack}
        />
      )}
      {appState === 'game-learning' && gameSession && (
        <Game
          mode="learning"
          level={gameSession.level}
          responseType={gameSession.responseType}
          onGameEnd={handleGameEnd}
        />
      )}
      {appState === 'game-challenge' && gameSession && (
        <Game
          mode="challenge"
          level={gameSession.level}
          responseType={gameSession.responseType}
          onGameEnd={handleGameEnd}
        />
      )}
      {appState === 'tables' && (
        <Tables onBack={handleBack} />
      )}
      {appState === 'learn' && (
        <Learn onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
