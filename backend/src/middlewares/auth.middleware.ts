import type {NextFunction,Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';
import type {JwtPayload} from '../types/auth.js';
export function authenticateToken(req:Request,res:Response,next:NextFunction){
 const authorization=req.header('Authorization');
 if(!authorization?.startsWith('Bearer ')) return res.status(401).json({message:'Authentication required'});
 try{req.user=jwt.verify(authorization.substring(7),env.jwtSecret) as JwtPayload; next();}
 catch{return res.status(401).json({message:'Invalid or expired token'});}
}
