import { Pool } from 'pg';
import { env } from '../config/env.js';

// Un pool reutiliza conexiones y evita abrir una conexión PostgreSQL por cada petición.
export const pool=new Pool({connectionString:env.databaseUrl});
pool.on('error',error=>console.error('Unexpected PostgreSQL pool error:',error));
