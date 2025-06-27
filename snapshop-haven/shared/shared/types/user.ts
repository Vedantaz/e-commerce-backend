// shared/types/user.ts
export interface IUser{
    _id:string;
    name:string;
    email:string;
    password?:string;
    role:'admin'| 'customer';
}
