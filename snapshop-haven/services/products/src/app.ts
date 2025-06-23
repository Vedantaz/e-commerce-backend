// services/products/src/app.ts
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Products service is up!' });
});

export default app;
