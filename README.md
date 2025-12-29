# @zos-apps/config

Shared configuration for zOS applications. Eliminates duplicate config files across 70+ apps.

## Installation

```bash
npm install -D @zos-apps/config
```

## Usage

### TypeScript Configuration

```json
// tsconfig.json
{
  "extends": "@zos-apps/config/tsconfig",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### tsup Configuration

```js
// tsup.config.ts
import { createConfig } from '@zos-apps/config/tsup';

export default createConfig();

// With customization:
export default createConfig({
  minify: false,
  entry: ['src/index.tsx', 'src/worker.ts'],
});
```

### ESLint Configuration

```js
// eslint.config.js
import config from '@zos-apps/config/eslint';
export default config;
```

## What's Included

### tsconfig.base.json
- ES2022 target
- React JSX support
- Strict mode enabled
- Declaration files generated
- Source maps enabled

### tsup.base.js
- ESM output format
- TypeScript declarations
- Tree shaking enabled
- Minification enabled
- React externalized

### eslint.config.js
- TypeScript support
- React best practices
- Modern JavaScript rules

## Migration

Replace your current configs with:

**tsconfig.json:**
```json
{
  "extends": "@zos-apps/config/tsconfig"
}
```

**tsup.config.ts:**
```js
import { createConfig } from '@zos-apps/config/tsup';
export default createConfig();
```

## License

MIT
