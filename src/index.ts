/**
 * @zos-apps/config
 * 
 * Shared configuration, types, and hooks for zOS applications
 * 
 * ## Exports
 * 
 * ### Build Configuration
 * - `tsconfig.base.json` - Base TypeScript configuration
 * - `tsup.base.js` - Base tsup bundler configuration
 * - `eslint.config.js` - Base ESLint configuration
 * 
 * ### Types
 * - `AppProps` - Standard props for all zOS apps
 * - `AppComponent` - Type for app components
 * - `GameState` - Common game state interface
 * - `Direction`, `Point`, `Size`, `Rect` - Common geometry types
 * - `KeyMap`, `Grid`, `HighScoreEntry` - Game utility types
 * 
 * ### Hooks
 * - `useKeyboard` - Simplified keyboard event handling
 * - `useGameLoop` - Game loop with configurable interval
 * - `useHighScore` - Persistent high score management
 * - `useGameState` - Common game state management
 * - `useTimer` - Game timer with controls
 * - `useLocalStorage` - Generic localStorage hook
 * - `useAnimationFrame` - Smooth animation hook
 * - `useGrid` - 2D grid state management
 * - `useWindowSize` - Track window dimensions for responsive layouts
 * - `useDebounce` - Debounce a value
 * - `usePrevious` - Track previous value
 * 
 * @example
 * ```tsx
 * import { AppProps, useKeyboard, useHighScore } from '@zos-apps/config';
 * 
 * const MyGame: React.FC<AppProps> = ({ onClose }) => {
 *   const { highScore, updateHighScore } = useHighScore('my-game');
 *   
 *   useKeyboard({
 *     ArrowUp: 'up',
 *     ArrowDown: 'down',
 *   }, (action) => move(action));
 *   
 *   return <div>...</div>;
 * };
 * ```
 */

// Build configuration exports
export { baseConfig, createConfig } from '../tsup.base.js';

// Type exports
export type {
  AppProps,
  AppComponent,
  GameState,
  Direction,
  Direction8,
  Point,
  Size,
  Rect,
  KeyMap,
  HighScoreEntry,
  Grid,
  OverlayState,
  TimerState,
  DifficultyLevel,
} from './types';

// Hook exports
export {
  useKeyboard,
  useGameLoop,
  useHighScore,
  useGameState,
  useTimer,
  useLocalStorage,
  useAnimationFrame,
  useGrid,
  useWindowSize,
  useDebounce,
  usePrevious,
} from './hooks';
