import express from 'express';
import userRoutes from './routes/userRoutes'
const app = express();
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({status:"Users service is up!"});
})

app.use('/api/users', userRoutes);
export default app;