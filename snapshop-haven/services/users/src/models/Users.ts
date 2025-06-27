import mongoose, {Schema, Document, Types}from 'mongoose';

import {IUser} from '../../../../shared/types/user'

export interface IUserDoc extends Omit<IUser,'_id'>, Document {
    _id:Types.ObjectId;    // Mongoose 
}

const userSchema = new Schema<IUserDoc>({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum: ['admin', 'customer'], default: 'customer'},

})

export const User = mongoose.model<IUserDoc>('User', userSchema);