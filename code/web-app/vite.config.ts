import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_PORT, VITE_GLOB_API_URL } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(),
      // createStyleImportPlugin({
      //   resolves: [AntdResolve()],
      // }),
    ],
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    server: {
      host: "0.0.0.0",
      port: Number(VITE_PORT || 8080),
      proxy: {
        [VITE_GLOB_API_URL]: {
          target: "https://mock.apifox.cn/m1/3183507-0-default",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${VITE_GLOB_API_URL}`), ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  });
};
