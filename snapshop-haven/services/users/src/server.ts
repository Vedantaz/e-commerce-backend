import {connectDB} from './db';
import app from './app';

const PORT = process.env.port || 5001;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Users service running on port : ${PORT}`);
    })
})