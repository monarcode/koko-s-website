import { defineConfig } from "@tanstack/start/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite() {
    return {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./app"),
        },
      },
      plugins: [],
    };
  },
});
