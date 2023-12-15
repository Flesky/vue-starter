import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'types/router.d.ts',
    }),
    vue(),
    vueJsx(),
    Components({
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      resolvers: [
        IconsResolver(
          // TODO: Configure your icons
          // https://github.com/antfu/unplugin-icons
        ),
      ],
      dts: 'types/components.d.ts',
    }),
    AutoImport({
      dirs: ['src/composables'],
      imports: [
        'vue',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
      ],
      vueTemplate: true,
      dts: 'types/auto-imports.d.ts',
    }),
    Icons({
      compiler: 'vue3',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
