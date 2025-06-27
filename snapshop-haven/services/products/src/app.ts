// services/products/src/app.ts
import express, { Request, Response } from 'express';
import productRoutes from './routes/product.routes'
import '../../../shared/types/custom'
const app = express();
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Products service is up!' });
});
app.use('/api/products', productRoutes)
export default app;
