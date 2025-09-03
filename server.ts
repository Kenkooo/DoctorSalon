import { createServer, IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import { initDb, fetchProducts, findUser } from './db.js';

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = createServer(async (req, res) => {
  if (!req.url) {
    return sendJson(res, 404, { message: 'Not found' });
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/products') {
    const products = await fetchProducts();
    return sendJson(res, 200, products);
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    try {
      const body = await parseBody(req);
      const user = await findUser(body.id);
      if (user) {
        return sendJson(res, 200, user);
      }
      return sendJson(res, 404, { message: 'User not found' });
    } catch (err) {
      return sendJson(res, 400, { message: 'Invalid JSON' });
    }
  }

  return sendJson(res, 404, { message: 'Not found' });
});

const PORT = 3000;
initDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database', err);
    process.exit(1);
  });
