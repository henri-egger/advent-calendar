import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: false,
    },
    preview: {
        port: 3030,
        open: true,
    },
});
