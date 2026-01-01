# @zos-apps/config

Shared configuration, types, and hooks for zOS applications. Eliminates duplicate code across 70+ apps.

## Installation

```bash
npm install @zos-apps/config
```

## Features

- **Build Configuration**: Shared tsconfig, tsup, and ESLint configs
- **TypeScript Types**: Common types for app props, game state, coordinates
- **React Hooks**: Reusable hooks for keyboard, game loops, storage, timers

## Usage

### Types

```typescript
import type { AppProps, GameState, Point, Direction, KeyMap } from '@zos-apps/config';

const MyApp: React.FC<AppProps> = ({ onClose }) => {
  return <div>...</div>;
};
```

### Hooks

```typescript
import { 
  useKeyboard,
  useGameLoop,
  useHighScore,
  useGameState,
  useTimer,
  useLocalStorage,
  useAnimationFrame,
  useGrid,
} from '@zos-apps/config';
```

#### useKeyboard
```typescript
useKeyboard({
  ArrowUp: 'up', ArrowDown: 'down',
  ' ': 'pause',
}, (action) => {
  if (action === 'pause') togglePause();
  else move(action);
}, { enabled: !gameOver });
```

#### useGameLoop
```typescript
useGameLoop(() => {
  updateGame();
}, 100, isPlaying);
```

#### useHighScore
```typescript
const { highScore, updateHighScore } = useHighScore('my-game');
if (score > highScore) updateHighScore(score);
```

#### useGameState
```typescript
const { 
  score, isPaused, isGameOver,
  start, pause, togglePause, gameOver, reset, addScore 
} = useGameState();
```

#### useTimer
```typescript
const { elapsed, isRunning, start, stop, reset } = useTimer();
```

#### useLocalStorage
```typescript
const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
```

#### useGrid
```typescript
const { grid, setCell, getCell, fill, clear } = useGrid(10, 20, null);
```

### Build Configuration

**tsconfig.json:**
```json
{
  "extends": "@zos-apps/config/tsconfig"
}
```

**tsup.config.ts:**
```typescript
import { createConfig } from '@zos-apps/config/tsup';
export default createConfig();

// With customization:
export default createConfig({
  minify: false,
  entry: ['src/index.tsx', 'src/worker.ts'],
});
```

**eslint.config.js:**
```javascript
import config from '@zos-apps/config/eslint';
export default config;
```

## Available Types

| Type | Description |
|------|-------------|
| `AppProps` | Standard props for all zOS apps |
| `AppComponent` | Type for app components |
| `GameState` | Common game state interface |
| `Direction` | 4-way direction type |
| `Direction8` | 8-way direction type |
| `Point` | 2D coordinate `{ x, y }` |
| `Size` | Dimensions `{ width, height }` |
| `Rect` | Bounding rectangle |
| `KeyMap<T>` | Keyboard mapping type |
| `Grid<T>` | 2D array type |
| `HighScoreEntry` | High score with metadata |
| `OverlayState` | Pause/game over overlay state |
| `TimerState` | Timer state |
| `DifficultyLevel` | Difficulty preset |

## License

MIT
