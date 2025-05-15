import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { DynamoDBService } from './services/dynamoDBService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('AWS_REGION:', process.env.AWS_REGION);