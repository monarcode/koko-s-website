// app.config.js
import { defineConfig } from "@tanstack/start/config";
import path, { dirname } from "path";
import Unfonts from "unplugin-fonts/vite";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var app_config_default = defineConfig({
  vite() {
    return {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./app")
        }
      },
      plugins: [
        Unfonts({
          custom: {
            families: [
              {
                name: "Sofia Pro",
                src: "./app/assets/fonts/SofiaProLight.ttf",
                local: "Sofia Pro",
                transform
              }
              // {
              //   name: "Abiah",
              //   src: "./app/assets/fonts/Abiah-Regular.otf",
              //   local: "Abiah",
              // },
            ],
            display: "auto",
            preload: true,
            prefetch: false,
            injectTo: "head-prepend"
          }
        })
      ]
    };
  }
});
export {
  app_config_default as default
};
