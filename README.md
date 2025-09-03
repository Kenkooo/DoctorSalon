ドクターサロンテストページ

## サーバー

開発用の簡単なバックエンドサーバーを TypeScript で実装しました。

```bash
npm run build-server
node dist/server.js
```

サーバーは `http://localhost:3000` で起動し、次のエンドポイントを提供します:

- `GET /api/products` – サンプル商品の一覧を返します。
- `POST /api/login` – `{"id": "1"}` のようなユーザーIDを受け取り、該当ユーザーを返します。

## Docker での起動

PostgreSQL とサーバーをまとめて起動する `docker-compose.yml` を用意しています。

```bash
docker compose up --build
```

サーバーは `http://localhost:3000` で利用でき、データは PostgreSQL に保存されます。
