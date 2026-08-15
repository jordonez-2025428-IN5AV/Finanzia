import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';
import type { JwtPayload } from '../types/auth.js';
export class AuthService{
 constructor(private readonly repo:UserRepository){}
 async login(username:string,password:string){
  const user=await this.repo.findByUsername(username);
  // Mensaje uniforme para no revelar si un usuario existe.
  if(!user || !(await bcrypt.compare(password,user.password))) throw new Error('INVALID_CREDENTIALS');
  const payload:JwtPayload={id:user.id,username:user.username,role:user.role};
  const token=jwt.sign(payload,env.jwtSecret,{expiresIn:env.jwtExpiresIn as jwt.SignOptions['expiresIn']});
  return {token,user:payload};
 }
 getCurrentUser(id:number){return this.repo.findById(id);}
}
