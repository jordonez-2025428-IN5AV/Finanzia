import { pool } from '../database/db.js';
import type { UserRole } from '../types/auth.js';
export interface UserRecord{id:number;username:string;password:string;role:UserRole;}
export class UserRepository{
 async findByUsername(username:string){const r=await pool.query<UserRecord>('SELECT id,username,password,role FROM users WHERE username=$1 LIMIT 1',[username]);return r.rows[0]??null;}
 async findById(id:number){const r=await pool.query<Omit<UserRecord,'password'>>('SELECT id,username,role FROM users WHERE id=$1 LIMIT 1',[id]);return r.rows[0]??null;}
 async findAll(){const r=await pool.query<Omit<UserRecord,'password'>>('SELECT id,username,role FROM users ORDER BY id');return r.rows;}
}
