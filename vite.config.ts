import vue from '@vitejs/plugin-vue';
import { theme } from 'ant-design-vue';
import path from 'path';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 如果用了某些 UI 库的 Less 变量
        modifyVars: mapToken,
      },
    },
  },
  server: {
    cors: true, // 必须开启，基座才能 fetch 资源
    port: 5174, // 假设 Vue 5173, Angular 4200
  },
  base: 'http://localhost:5174/', // 解决图片等静态资源 404
  build: {
    manifest: true, // 生产环境必须开启，用于基座解析文件名
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@views', replacement: path.resolve(__dirname, 'src/views') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
    ],
  },
});
