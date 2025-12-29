/**
 * Base tsup configuration for zOS apps
 * 
 * Usage in your app:
 * ```js
 * import { createConfig } from '@zos-apps/config/tsup';
 * export default createConfig();
 * ```
 * 
 * Or with customization:
 * ```js
 * import { createConfig } from '@zos-apps/config/tsup';
 * export default createConfig({
 *   minify: false,
 *   entry: ['src/index.tsx', 'src/worker.ts'],
 * });
 * ```
 */

export const baseConfig = {
  entry: ['src/index.tsx'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@z-os/sdk', '@z-os/ui', '@z-os/core'],
  treeshake: true,
  minify: true,
};

export function createConfig(overrides = {}) {
  return {
    ...baseConfig,
    ...overrides,
  };
}

export default baseConfig;
