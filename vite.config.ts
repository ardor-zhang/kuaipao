import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import * as path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@editor',
        replacement: path.resolve(__dirname, 'src/views/lowcode-editor'),
      },
    ],
  },
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    PkgConfig(),
    OptimizationPersist(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
});
