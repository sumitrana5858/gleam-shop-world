import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ["gleam-shop-world.onrender.com"]
  }
});
