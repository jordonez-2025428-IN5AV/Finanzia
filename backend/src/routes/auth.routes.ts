import {Router} from 'express';import {AuthController} from '../controllers/auth.controller.js';import {authenticateToken} from '../middlewares/auth.middleware.js';
export function createAuthRoutes(c:AuthController){const r=Router();r.post('/login',c.login);r.get('/me',authenticateToken,c.me);return r;}
