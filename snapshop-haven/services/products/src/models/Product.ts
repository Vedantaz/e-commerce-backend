import mongoose, {Document, Schema} from 'mongoose';

export interface IProduct extends Document{
    name:string,
    price:number,
    description:string,
    stock:number,
    category:string,
    createdAt:Date
}

const ProductSchema = new Schema<IProduct>(
{
     name:{type:String, required:true},
     price:{type:Number, required:true},
     description:{type:String},
     stock:{type:Number, default:0},
     category:{type:String, required:true}
},
{timestamps:true}
)

export const Product = mongoose.model<IProduct>('Product', ProductSchema)