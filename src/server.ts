import express, { Request } from 'express';
import path from 'path';
import { ViteDevServer, createServer as createViteServer } from 'vite';

import type { ServerRender } from './AppServer';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5173;
const BASE = process.env.BASE || '/';

const app = express();
let vite: ViteDevServer;

if (!isProduction) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: BASE,
  });
  app.use(vite.middlewares);
} else {
  const sirv = (await import('sirv')).default;
  app.use(BASE, sirv(path.resolve('./dist/client')));
}

app.use('*', async (req: Request, res) => {
  const url = req.originalUrl;

  try {
    let clientScript = '';
    let clientStyle: string | undefined;
    let render: ServerRender;
    let didError = false;

    if (!isProduction) {
      clientScript = './src/AppClient.tsx';
      render = (await vite.ssrLoadModule('./src/AppServer.tsx')).render;
    } else {
      clientScript = 'script.js';
      clientStyle = 'styles.css';
      const serverScript = './server/script.js';
      render = (await import(serverScript)).render;
    }

    const stream = await render(url, clientScript, clientStyle, {
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },

      onError(error: unknown) {
        didError = true;
        console.error(error);
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    } else {
      res.status(500).end('Something went wrong');
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
