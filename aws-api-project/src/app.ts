import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './routes/userRoutes';
import { DynamoDBService } from './services/dynamoDBService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/api/test-dynamo', async (req, res) => {
    try {
        const dynamoService = new DynamoDBService();
        // Intenta leer un usuario de prueba (ajusta el id según tu tabla)
        const result = await dynamoService.getUser('test-id');
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: (error instanceof Error ? error.message : error) });
    }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('API AWS escuchando en 0.0.0.0:3000');
});

console.log('AWS_REGION:', process.env.AWS_REGION);