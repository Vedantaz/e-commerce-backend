// services/products/src/app.ts
import express, { NextFunction, Request, Response } from 'express';
import productRoutes from './routes/product.routes'
const app = express();
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Products service is up!' });
});
app.use('/api/products', productRoutes)
app.use((err: any, req: Request, res: Response, next: NextFunction) =>{
 if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(400).json({ message: 'File too large' });
    return;
  }

  if (err.message?.includes('Unexpected field')) {
    res.status(400).json({ message: 'Unexpected form field' });
    return;
  }

  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Something went wrong', error: err.message || err });
});
export default app;

