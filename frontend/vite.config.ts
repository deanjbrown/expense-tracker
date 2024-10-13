import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Old config
// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//  resolve: {
//    alias: {
//      "@": path.resolve(__dirname, "./src"),
//    },
//  },
//});
//

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    
    strictPort: true,
    host: true,
    origin: "http://127.0.0.1:8080",
  },
});
