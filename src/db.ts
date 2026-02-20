import { IDBPDatabase, openDB } from 'idb';
import { GameStats, PlayerProgress } from './types';

const DB_NAME = 'MultiplicaAppDB';
const DB_VERSION = 1;

export class GameDatabase {
  private db: IDBPDatabase | null = null;

  async init(): Promise<void> {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Tabla de estadísticas de juegos
        if (!db.objectStoreNames.contains('gameStats')) {
          const store = db.createObjectStore('gameStats', { keyPath: 'id', autoIncrement: true });
          store.createIndex('date', 'date');
          store.createIndex('mode', 'mode');
        }

        // Tabla de progreso del jugador
        if (!db.objectStoreNames.contains('playerProgress')) {
          db.createObjectStore('playerProgress', { keyPath: 'id' });
        }
      }
    });
  }

  async saveGameStats(stats: Omit<GameStats, 'id'>): Promise<number> {
    if (!this.db) await this.init();
    return this.db!.add('gameStats', {
      ...stats,
      date: Date.now()
    } as GameStats);
  }

  async getGameStats(limit: number = 10): Promise<GameStats[]> {
    if (!this.db) await this.init();
    const allStats = await this.db!.getAll('gameStats');
    return allStats.reverse().slice(0, limit);
  }

  async getPlayerProgress(): Promise<PlayerProgress> {
    if (!this.db) await this.init();
    const progress = await this.db!.get('playerProgress', 1);
    
    return progress || {
      totalScore: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      levelAchievements: {
        1: false,
        2: false,
        3: false,
        4: false
      },
      badges: [],
      lastPlayed: 0,
      streakDays: 0,
      currentStreak: 0
    };
  }

  async updatePlayerProgress(progress: PlayerProgress): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put('playerProgress', { id: 1, ...progress });
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.clear('gameStats');
    await this.db!.clear('playerProgress');
  }
}

export const gameDB = new GameDatabase();
