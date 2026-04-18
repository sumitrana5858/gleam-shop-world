import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      host: true
    },
    preview: {
      host: true,
      allowedHosts: true   
    }
  }
});
