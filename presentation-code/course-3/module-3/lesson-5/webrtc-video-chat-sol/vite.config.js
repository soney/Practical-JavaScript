import fs from "fs";
import { defineConfig } from "vite";
import { WebSocketServer } from "ws";

const host = process.env.VITE_HOST || "35.1.103.63";
const keyPath = process.env.VITE_HTTPS_KEY || "35.1.103.63+3-key.pem";
const certPath = process.env.VITE_HTTPS_CERT || "35.1.103.63+3.pem";

export default defineConfig({
  plugins: [],
  server: {
    host,
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
  },
});
