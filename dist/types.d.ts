import { FC } from 'react';

/**
 * @zos-apps/config - Shared TypeScript Types
 *
 * Common types used across all zOS applications
 */

/**
 * Standard props interface for all zOS applications
 * Every app component receives these props from the window manager
 */
interface AppProps {
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
type AppComponent = FC<AppProps>;
/**
 * Common game state interface
 * Use with useGameState hook for consistent game state management
 */
interface GameState {
    score: number;
    level: number;
    isPlaying: boolean;
    isPaused: boolean;
    isGameOver: boolean;
}
/**
 * Direction types commonly used in grid-based games
 */
type Direction = 'up' | 'down' | 'left' | 'right';
type Direction8 = Direction | 'up-left' | 'up-right' | 'down-left' | 'down-right';
/**
 * 2D point/coordinate type
 */
interface Point {
    x: number;
    y: number;
}
/**
 * 2D size type
 */
interface Size {
    width: number;
    height: number;
}
/**
 * Bounding rectangle
 */
interface Rect extends Point, Size {
}
/**
 * Keyboard mapping type for key handlers
 * Maps key names to their corresponding action
 */
type KeyMap<T extends string = string> = Record<string, T>;
/**
 * High score entry with optional metadata
 */
interface HighScoreEntry {
    score: number;
    name?: string;
    date?: string;
    level?: number;
}
/**
 * Grid cell generic type for grid-based games
 */
type Grid<T> = T[][];
/**
 * Common overlay state for pause/game over screens
 */
interface OverlayState {
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
interface TimerState {
    elapsed: number;
    isRunning: boolean;
}
/**
 * Difficulty level preset
 */
interface DifficultyLevel {
    name: string;
    value: string | number;
    [key: string]: unknown;
}

export type { AppComponent, AppProps, DifficultyLevel, Direction, Direction8, GameState, Grid, HighScoreEntry, KeyMap, OverlayState, Point, Rect, Size, TimerState };
