import { UserRepository } from '../repositories/user.repository.js';
export class UserService{constructor(private readonly repo:UserRepository){} getAllUsers(){return this.repo.findAll();} getProfile(id:number){return this.repo.findById(id);}}
