import { useRef, useEffect, useState, useCallback } from 'react';

// src/hooks.ts
function useKeyboard(keyMap, handler, options = {}) {
  const { enabled = true, preventDefault = true } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e) => {
      const action = keyMap[e.key];
      if (action !== void 0) {
        if (preventDefault) e.preventDefault();
        handlerRef.current(action, e);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keyMap, enabled, preventDefault]);
}
function useGameLoop(callback, interval, enabled = true) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => callbackRef.current(), interval);
    return () => clearInterval(id);
  }, [interval, enabled]);
}
function useHighScore(key, initialValue = 0) {
  const storageKey = `zos-${key}-highscore`;
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : initialValue;
  });
  const updateHighScore = useCallback((score) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(storageKey, score.toString());
      return true;
    }
    return false;
  }, [highScore, storageKey]);
  const resetHighScore = useCallback(() => {
    setHighScore(initialValue);
    localStorage.removeItem(storageKey);
  }, [initialValue, storageKey]);
  return { highScore, updateHighScore, resetHighScore };
}
function useGameState(initialState) {
  const [state, setState] = useState({
    score: 0,
    level: 1,
    isPlaying: false,
    isPaused: true,
    isGameOver: false,
    ...initialState
  });
  const start = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: true, isPaused: false, isGameOver: false }));
  }, []);
  const pause = useCallback(() => {
    setState((s) => ({ ...s, isPaused: true }));
  }, []);
  const resume = useCallback(() => {
    setState((s) => ({ ...s, isPaused: false }));
  }, []);
  const togglePause = useCallback(() => {
    setState((s) => ({ ...s, isPaused: !s.isPaused }));
  }, []);
  const gameOver = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: false, isGameOver: true }));
  }, []);
  const reset = useCallback(() => {
    setState({
      score: 0,
      level: 1,
      isPlaying: false,
      isPaused: true,
      isGameOver: false,
      ...initialState
    });
  }, [initialState]);
  const addScore = useCallback((points) => {
    setState((s) => ({ ...s, score: s.score + points }));
  }, []);
  const setLevel = useCallback((level) => {
    setState((s) => ({ ...s, level }));
  }, []);
  return {
    state,
    start,
    pause,
    resume,
    togglePause,
    gameOver,
    reset,
    addScore,
    setLevel,
    // Convenience getters
    score: state.score,
    level: state.level,
    isPlaying: state.isPlaying,
    isPaused: state.isPaused,
    isGameOver: state.isGameOver
  };
}
function useTimer(autoStart = false) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((t) => t + 1);
      }, 1e3);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);
  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setElapsed(0);
    setIsRunning(false);
  }, []);
  const toggle = useCallback(() => setIsRunning((r) => !r), []);
  return { elapsed, isRunning, start, stop, reset, toggle };
}
function useLocalStorage(key, initialValue) {
  const storageKey = `zos-${key}`;
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const nextValue = value instanceof Function ? value(prev) : value;
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextValue));
      } catch (e) {
        console.warn(`Failed to save to localStorage:`, e);
      }
      return nextValue;
    });
  }, [storageKey]);
  return [storedValue, setValue];
}
function useAnimationFrame(callback, enabled = true) {
  const callbackRef = useRef(callback);
  const previousTimeRef = useRef();
  const frameRef = useRef();
  callbackRef.current = callback;
  useEffect(() => {
    if (!enabled) return;
    const animate = (time) => {
      if (previousTimeRef.current !== void 0) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);
}
function useGrid(width, height, initialValue) {
  const createGrid = useCallback(
    () => Array(height).fill(null).map(() => Array(width).fill(initialValue)),
    [width, height, initialValue]
  );
  const [grid, setGrid] = useState(createGrid);
  const setCell = useCallback((x, y, value) => {
    setGrid((g) => {
      const newGrid = g.map((row) => [...row]);
      if (y >= 0 && y < height && x >= 0 && x < width) {
        newGrid[y][x] = value;
      }
      return newGrid;
    });
  }, [width, height]);
  const getCell = useCallback((x, y) => {
    if (y >= 0 && y < height && x >= 0 && x < width) {
      return grid[y][x];
    }
    return void 0;
  }, [grid, width, height]);
  const fill = useCallback((value) => {
    setGrid(Array(height).fill(null).map(() => Array(width).fill(value)));
  }, [width, height]);
  const clear = useCallback(() => {
    setGrid(createGrid());
  }, [createGrid]);
  return { grid, setGrid, setCell, getCell, fill, clear };
}
function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768
  }));
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    width: size.width,
    height: size.height,
    isMobile: size.width < 768,
    isTablet: size.width >= 768 && size.width < 1024,
    isDesktop: size.width >= 1024
  };
}
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export { useAnimationFrame, useDebounce, useGameLoop, useGameState, useGrid, useHighScore, useKeyboard, useLocalStorage, usePrevious, useTimer, useWindowSize };
//# sourceMappingURL=chunk-5YWEGPS5.js.map
//# sourceMappingURL=chunk-5YWEGPS5.js.map