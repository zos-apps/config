/**
 * @zos-apps/config
 * 
 * Shared configuration for zOS applications
 * 
 * Exports:
 * - tsconfig.base.json - Base TypeScript configuration
 * - tsup.base.js - Base tsup bundler configuration
 * - eslint.config.js - Base ESLint configuration
 */

export { baseConfig, createConfig } from '../tsup.base.js';
