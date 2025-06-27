import express from 'express';
import userRoutes from './routes/users.routes'
const app = express();
app.use(express.json());


app.get('/health', (req, res) => {
    res.json({status:"Product service is up!"});
})

app.use('/api/users', userRoutes);
export default app;