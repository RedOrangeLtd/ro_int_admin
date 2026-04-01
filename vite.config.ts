import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          charts: ['apexcharts', 'react-apexcharts'],
          calendar: ['@fullcalendar/core', '@fullcalendar/daygrid', '@fullcalendar/interaction', '@fullcalendar/list', '@fullcalendar/react', '@fullcalendar/timegrid'],
          editor: ['react-quill-new'],
          maps: ['@react-jvectormap/core', '@react-jvectormap/world'],
          utils: ['clsx', 'tailwind-merge', 'flatpickr', 'sweetalert2', 'swiper']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
