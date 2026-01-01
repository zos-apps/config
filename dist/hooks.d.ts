import * as react from 'react';
import { KeyMap, GameState, TimerState } from './types.js';

/**
 * useKeyboard - Simplified keyboard event handling
 *
 * @example
 * ```tsx
 * useKeyboard({
 *   ArrowUp: 'up',
 *   ArrowDown: 'down',
 *   ' ': 'pause',
 * }, (action) => {
 *   if (action === 'pause') togglePause();
 *   else move(action);
 * }, { enabled: !gameOver });
 * ```
 */
declare function useKeyboard<T extends string>(keyMap: KeyMap<T>, handler: (action: T, event: KeyboardEvent) => void, options?: {
    enabled?: boolean;
    preventDefault?: boolean;
}): void;
/**
 * useGameLoop - Game loop with configurable interval
 *
 * @example
 * ```tsx
 * useGameLoop(() => {
 *   moveSnake();
 *   checkCollision();
 * }, 100, !isPaused && !gameOver);
 * ```
 */
declare function useGameLoop(callback: () => void, interval: number, enabled?: boolean): void;
/**
 * useHighScore - Persistent high score with localStorage
 *
 * @example
 * ```tsx
 * const { highScore, updateHighScore, resetHighScore } = useHighScore('snake');
 * // Later:
 * if (score > highScore) updateHighScore(score);
 * ```
 */
declare function useHighScore(key: string, initialValue?: number): {
    highScore: number;
    updateHighScore: (score: number) => boolean;
    resetHighScore: () => void;
};
/**
 * useGameState - Common game state management
 *
 * @example
 * ```tsx
 * const { state, start, pause, resume, gameOver, reset, addScore } = useGameState();
 * ```
 */
declare function useGameState(initialState?: Partial<GameState>): {
    state: GameState;
    start: () => void;
    pause: () => void;
    resume: () => void;
    togglePause: () => void;
    gameOver: () => void;
    reset: () => void;
    addScore: (points: number) => void;
    setLevel: (level: number) => void;
    score: number;
    level: number;
    isPlaying: boolean;
    isPaused: boolean;
    isGameOver: boolean;
};
/**
 * useTimer - Game timer with start/stop/reset
 *
 * @example
 * ```tsx
 * const { elapsed, isRunning, start, stop, reset } = useTimer();
 * ```
 */
declare function useTimer(autoStart?: boolean): TimerState & {
    start: () => void;
    stop: () => void;
    reset: () => void;
    toggle: () => void;
};
/**
 * useLocalStorage - Generic localStorage hook with type safety
 *
 * @example
 * ```tsx
 * const [settings, setSettings] = useLocalStorage('game-settings', defaultSettings);
 * ```
 */
declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void];
/**
 * useAnimationFrame - RequestAnimationFrame hook for smooth animations
 *
 * @example
 * ```tsx
 * useAnimationFrame((deltaTime) => {
 *   updatePosition(deltaTime);
 * }, isAnimating);
 * ```
 */
declare function useAnimationFrame(callback: (deltaTime: number) => void, enabled?: boolean): void;
/**
 * useGrid - Create and manage a 2D grid
 *
 * @example
 * ```tsx
 * const { grid, setCell, getCell, fill, clear } = useGrid(10, 20, null);
 * ```
 */
declare function useGrid<T>(width: number, height: number, initialValue: T): {
    grid: T[][];
    setGrid: react.Dispatch<react.SetStateAction<T[][]>>;
    setCell: (x: number, y: number, value: T) => void;
    getCell: (x: number, y: number) => T | undefined;
    fill: (value: T) => void;
    clear: () => void;
};
/**
 * useWindowSize - Track window dimensions for responsive layouts
 *
 * @example
 * ```tsx
 * const { width, height, isMobile, isTablet, isDesktop } = useWindowSize();
 *
 * return isMobile ? <MobileLayout /> : <DesktopLayout />;
 * ```
 */
declare function useWindowSize(): {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};
/**
 * useDebounce - Debounce a value or callback
 *
 * @example
 * ```tsx
 * // Debounce a value
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 *
 * useEffect(() => {
 *   search(debouncedQuery);
 * }, [debouncedQuery]);
 * ```
 */
declare function useDebounce<T>(value: T, delay: number): T;
/**
 * usePrevious - Track the previous value of a state
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * // prevCount is the value of count before the last render
 * ```
 */
declare function usePrevious<T>(value: T): T | undefined;

export { useAnimationFrame, useDebounce, useGameLoop, useGameState, useGrid, useHighScore, useKeyboard, useLocalStorage, usePrevious, useTimer, useWindowSize };
