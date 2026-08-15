import bcrypt from 'bcrypt';
import { pool } from './db.js';
async function seed(){
  const admin=await bcrypt.hash('Admin123!',12); const user=await bcrypt.hash('User123!',12);
  await pool.query(`INSERT INTO users(username,password,role) VALUES($1,$2,'ADMIN'),($3,$4,'USER') ON CONFLICT(username) DO UPDATE SET password=EXCLUDED.password,role=EXCLUDED.role`,['admin',admin,'usuario',user]);
  console.log('Seed completed.'); await pool.end();
}
seed().catch(async e=>{console.error(e);await pool.end();process.exit(1);});
