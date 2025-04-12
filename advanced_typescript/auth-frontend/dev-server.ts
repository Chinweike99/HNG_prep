// dev-server.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

app.prepare().then(() => {
  const server = express();
  
  // API requests proxy
  server.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
  
  // Default handler for all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});