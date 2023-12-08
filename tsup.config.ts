import { defineConfig } from 'tsup';
import CssModulesPlugin from 'esbuild-css-modules-plugin';

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [
    CssModulesPlugin({
      force: true,
      emitDeclarationFile: true,
      localsConvention: 'camelCaseOnly',
      namedExports: true,
      inject: false
    }),
  ],
});
