import { defineConfig } from "vite"
import VueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  plugins: [
    VueJsx()
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "button",
      fileName: "button"
    },
    minify: false,
    rollupOptions: {
      external: [
        'vue'
      ]
    }
  }
})
