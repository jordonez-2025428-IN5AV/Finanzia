import type {Request,Response} from 'express';
import {UserService} from '../services/user.service.js';
export class UserController{
 constructor(private readonly service:UserService){}
 profile=async(req:Request,res:Response)=>{if(!req.user)return res.status(401).json({message:'Authentication required'});const u=await this.service.getProfile(req.user.id);if(!u)return res.status(404).json({message:'User not found'});return res.json(u);};
 allUsers=async(_req:Request,res:Response)=>res.json(await this.service.getAllUsers());
}
