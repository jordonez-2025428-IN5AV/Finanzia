import type {Request,Response} from 'express';
import {AuthService} from '../services/auth.service.js';
export class AuthController{
 constructor(private readonly service:AuthService){}
 login=async(req:Request,res:Response)=>{const {username,password}=req.body??{};if(typeof username!=='string'||typeof password!=='string'||!username.trim()||!password)return res.status(400).json({message:'Username and password are required'});try{return res.json(await this.service.login(username.trim(),password));}catch(e){if(e instanceof Error&&e.message==='INVALID_CREDENTIALS')return res.status(401).json({message:'Invalid credentials'});console.error(e);return res.status(500).json({message:'Internal server error'});}};
 me=async(req:Request,res:Response)=>{if(!req.user)return res.status(401).json({message:'Authentication required'});const user=await this.service.getCurrentUser(req.user.id);if(!user)return res.status(404).json({message:'User not found'});return res.json(user);};
}
