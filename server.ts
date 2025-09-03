import { createServer, IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import { User, Product, Role } from './types.js';

const users: User[] = [
  { id: '1', name: 'クリニックA', role: Role.CLINIC },
  { id: '2', name: 'メーカーB', role: Role.MANUFACTURER },
  { id: '3', name: 'ディーラーC', role: Role.DEALER },
  { id: '4', name: 'サロンD', role: Role.SALON, dealerId: '3' }
];

const products: Product[] = [
  { id: 'p1', name: '美容液', description: 'お肌に優しい美容液', price: 5000, ingredientIds: [] },
  { id: 'p2', name: '保湿クリーム', description: 'しっとり保湿クリーム', price: 3000, ingredientIds: [] }
];

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
    return sendJson(res, 200, products);
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    try {
      const body = await parseBody(req);
      const user = users.find(u => u.id === body.id);
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
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
