import { defineConfig } from "vite"
import VueJsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
  plugins: [
    VueJsx()
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "popover",
      fileName: "popover"
    },
    minify: false,
    rollupOptions: {
      external: [
        'vue'
      ]
    }
  }
})
