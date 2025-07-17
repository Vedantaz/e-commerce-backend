// services/products/src/server.ts
import {connectDB} from './db';
import app from './app';

const PORT = process.env.PORT || 5002;
console.log("🚀 This is the ACTUAL src/server.ts being executed");

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Products service running on port : ${PORT}`);
    })
})