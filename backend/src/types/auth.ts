export type UserRole='ADMIN'|'USER';
export interface JwtPayload{id:number;username:string;role:UserRole;}
