// services/products/src/app.ts
import express, { Request, Response } from 'express';
import productRoutes from './routes/productRoutes';
const app = express();
import path from 'path';

console.log("✅ app.ts loaded...");

// app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads' , express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes)
// app.use(express.urlencoded({extended:true}));



app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Products service is up!' });
});

app.use( (req, res)=>{
  res.status(404).send('not found, not getting the path you are trying to get');
})
export default app;