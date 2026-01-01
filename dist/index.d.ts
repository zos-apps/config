export { AppComponent, AppProps, DifficultyLevel, Direction, Direction8, GameState, Grid, HighScoreEntry, KeyMap, OverlayState, Point, Rect, Size, TimerState } from './types.js';
export { useAnimationFrame, useDebounce, useGameLoop, useGameState, useGrid, useHighScore, useKeyboard, useLocalStorage, usePrevious, useTimer, useWindowSize } from './hooks.js';
import 'react';

/**
 * Type declarations for tsup.base.js
 */

interface TsupBaseConfig {
  entry: string[];
  format: string[];
  dts: boolean;
  sourcemap: boolean;
  clean: boolean;
  external: string[];
  treeshake: boolean;
  minify: boolean;
}

declare const baseConfig: TsupBaseConfig;
declare function createConfig(overrides?: Partial<TsupBaseConfig>): TsupBaseConfig;

export { baseConfig, createConfig };
