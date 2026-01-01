export { useAnimationFrame, useDebounce, useGameLoop, useGameState, useGrid, useHighScore, useKeyboard, useLocalStorage, usePrevious, useTimer, useWindowSize } from './chunk-5YWEGPS5.js';

// tsup.base.js
var baseConfig = {
  entry: ["src/index.tsx"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@z-os/sdk", "@z-os/ui", "@z-os/core", "lucide-react"],
  treeshake: true,
  minify: true
};
function createConfig(overrides = {}) {
  return {
    ...baseConfig,
    ...overrides
  };
}

export { baseConfig, createConfig };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map