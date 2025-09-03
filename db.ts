import pg from 'pg';
import { User, Product, Role } from './types.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/doctorsalon'
});

export async function initDb() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    dealer_id TEXT
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    ingredient_ids TEXT[]
  )`);

  const userCount = await pool.query('SELECT COUNT(*) FROM users');
  if (userCount.rows[0].count === '0') {
    await pool.query(`INSERT INTO users (id, name, role, dealer_id) VALUES
      ('1', 'クリニックA', 'clinic', NULL),
      ('2', 'メーカーB', 'manufacturer', NULL),
      ('3', 'ディーラーC', 'dealer', NULL),
      ('4', 'サロンD', 'salon', '3')`);
  }

  const productCount = await pool.query('SELECT COUNT(*) FROM products');
  if (productCount.rows[0].count === '0') {
    await pool.query(`INSERT INTO products (id, name, description, price, ingredient_ids) VALUES
      ('p1', '美容液', 'お肌に優しい美容液', 5000, ARRAY[]::text[]),
      ('p2', '保湿クリーム', 'しっとり保湿クリーム', 3000, ARRAY[]::text[])`);
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const result = await pool.query('SELECT * FROM products');
  return result.rows.map(r => ({
    id: r.id,
    name: r.name,
    description: r.description,
    price: Number(r.price),
    ingredientIds: r.ingredient_ids || []
  }));
}

export async function findUser(id: string): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;
  const r = result.rows[0];
  return { id: r.id, name: r.name, role: r.role as Role, dealerId: r.dealer_id || undefined };
}
