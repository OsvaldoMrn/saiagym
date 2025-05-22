import { Request, Response } from 'express';
import { DynamoDBService } from '../services/dynamoDBService';
import { CognitoService } from '../services/cognitoService';
import { v4 as uuidv4 } from 'uuid';

class UserController {
    private dynamoDBService: DynamoDBService;
    private cognitoService: CognitoService;

    constructor() {
        this.dynamoDBService = new DynamoDBService();
        this.cognitoService = new CognitoService();
    }

    public createUser = async (req: Request, res: Response) => {
        const { fullName, email, password, mobileNumber, dateOfBirth, weight, height } = req.body;

        try {
            // Generar un ID único para el usuario
            const userId = uuidv4(); // Genera un identificador único

            // Crear usuario en Cognito usando el UUID como username
            const user = await this.cognitoService.createUser(userId, email, password);
            console.log('Cognito response:', user);

            // Guardar el userId (UUID) y el email en DynamoDB
            await this.dynamoDBService.saveUser({
                id: userId,
                fullName,
                email,
                mobileNumber,
                dateOfBirth,
                weight,
                height,
            });

            res.status(201).json({ message: 'User created successfully', userId });
        } catch (error) {
            console.error('Error creating user:', error);

            if (error instanceof Error) {
                res.status(500).json({ message: 'Error creating user', error: error.message });
            } else {
                res.status(500).json({ message: 'Error creating user', error: 'Unknown error' });
            }
        }
    };

    public getUser = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            // Obtener usuario desde DynamoDB
            const user = await this.dynamoDBService.getUser(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error retrieving user:', error);

            if (error instanceof Error) {
                res.status(500).json({ message: 'Error retrieving user', error: error.message });
            } else {
                res.status(500).json({ message: 'Error retrieving user', error: 'Unknown error' });
            }
        }
    };

    public updateUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const { fullName, mobileNumber, dateOfBirth, weight, height } = req.body;

        try {
            // Actualizar información del usuario en DynamoDB
            await this.dynamoDBService.updateUser(userId, {
                fullName,
                mobileNumber,
                dateOfBirth,
                weight,
                height,
            });

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);

            if (error instanceof Error) {
                res.status(500).json({ message: 'Error updating user', error: error.message });
            } else {
                res.status(500).json({ message: 'Error updating user', error: 'Unknown error' });
            }
        }
    };

    public deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            // Eliminar usuario de Cognito
            await this.cognitoService.deleteUser(userId);

            // Eliminar información del usuario de DynamoDB
            await this.dynamoDBService.deleteUser(userId);

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);

            if (error instanceof Error) {
                res.status(500).json({ message: 'Error deleting user', error: error.message });
            } else {
                res.status(500).json({ message: 'Error deleting user', error: 'Unknown error' });
            }
        }
    };
}

export default UserController;