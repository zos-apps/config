/**
 * @zos-apps/config - Shared TypeScript Types
 * 
 * Common types used across all zOS applications
 */

import type { FC } from 'react';

/**
 * Standard props interface for all zOS applications
 * Every app component receives these props from the window manager
 */
export interface AppProps {
  /** Called when the app should close */
  onClose: () => void;
  /** Optional: Called when the app window gains focus */
  onFocus?: () => void;
  /** Optional: Additional CSS class names */
  className?: string;
}

/**
 * Type for a zOS application component
 */
export type AppComponent = FC<AppProps>;

/**
 * Common game state interface
 * Use with useGameState hook for consistent game state management
 */
export interface GameState {
  score: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
}

/**
 * Direction types commonly used in grid-based games
 */
export type Direction = 'up' | 'down' | 'left' | 'right';
export type Direction8 = Direction | 'up-left' | 'up-right' | 'down-left' | 'down-right';

/**
 * 2D point/coordinate type
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 2D size type
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Bounding rectangle
 */
export interface Rect extends Point, Size {}

/**
 * Keyboard mapping type for key handlers
 * Maps key names to their corresponding action
 */
export type KeyMap<T extends string = string> = Record<string, T>;

/**
 * High score entry with optional metadata
 */
export interface HighScoreEntry {
  score: number;
  name?: string;
  date?: string;
  level?: number;
}

/**
 * Grid cell generic type for grid-based games
 */
export type Grid<T> = T[][];

/**
 * Common overlay state for pause/game over screens
 */
export interface OverlayState {
  visible: boolean;
  title: string;
  subtitle?: string;
  emoji?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Timer state for games with time tracking
 */
export interface TimerState {
  elapsed: number;
  isRunning: boolean;
}

/**
 * Difficulty level preset
 */
export interface DifficultyLevel {
  name: string;
  value: string | number;
  [key: string]: unknown;
}
