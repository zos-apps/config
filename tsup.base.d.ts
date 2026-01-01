/**
 * Type declarations for tsup.base.js
 */

export interface TsupBaseConfig {
  entry: string[];
  format: string[];
  dts: boolean;
  sourcemap: boolean;
  clean: boolean;
  external: string[];
  treeshake: boolean;
  minify: boolean;
}

export const baseConfig: TsupBaseConfig;
export function createConfig(overrides?: Partial<TsupBaseConfig>): TsupBaseConfig;
export default baseConfig;
