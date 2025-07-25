import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI || '');
        console.log('Products DB connected');

    }catch(error:any){
        console.error('DB connection error', error.message);
        process.exit(1);
    }
}