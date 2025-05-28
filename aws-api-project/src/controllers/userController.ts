import { Request, Response } from 'express';
import { DynamoDBService } from '../services/dynamoDBService';
import { CognitoService } from '../services/cognitoService';
import { v4 as uuidv4 } from 'uuid';
const AWS = require('aws-sdk');

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1', // Cambia por tu región
});

class UserController {
    private dynamoDBService: DynamoDBService;
    private cognitoService: CognitoService;

    constructor() {
        this.dynamoDBService = new DynamoDBService();
        this.cognitoService = new CognitoService();
    }

    public createUser = async (req: Request, res: Response) => {
        console.log('BODY RECIBIDO EN AWS:', req.body); // <--- Agrega esto
        const { fullName, email, password, mobileNumber, age, weight, height, nickname } = req.body;
        const userId = uuidv4(); // o usa nickname si es único

        try {
            // Usa el UUID como username, email como atributo
            const user = await this.cognitoService.createUser(userId, email, password, nickname);
            console.log('Cognito response:', user);

            await this.dynamoDBService.saveUser({
                id: userId,
                fullName,
                email,
                nickname,
                mobileNumber,
                age,
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
        const { fullName, mobileNumber, age, weight, height } = req.body;

        try {
            // Actualizar información del usuario en DynamoDB
            await this.dynamoDBService.updateUser(userId, {
                fullName,
                mobileNumber,
                age,      // <-- Solo age
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

    public loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.COGNITO_CLIENT_ID,
            AuthParameters: {
                USERNAME: email, // Asegúrate que el usuario fue registrado con el email como username
                PASSWORD: password,
            },
        };

        try {
            const response = await cognito.initiateAuth(params).promise();
            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token: response.AuthenticationResult.AccessToken,
                idToken: response.AuthenticationResult.IdToken,
                refreshToken: response.AuthenticationResult.RefreshToken,
            });
        } catch (error: any) {
            console.error('Error en loginUser:', error); // <-- Agrega esto
            const errorMsg = error?.message || error?.code || 'Error desconocido';
            res.status(401).json({
                message: 'Credenciales inválidas o usuario no confirmado',
                error: errorMsg,
            });
        }
    };

    public checkEmail = async (req: Request, res: Response) => {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'Email parameter is required.' });
        }
        try {
            // Usa el servicio de Cognito
            const user = await this.cognitoService.findUserByEmail(email as string);
            if (user) {
                return res.status(200).json({ exists: true, message: 'This email is already registered.' });
            } else {
                return res.status(200).json({ exists: false, message: 'Email is available.' });
            }
        } catch (err) {
            console.error('Error checking email existence:', err);
            res.status(500).json({ message: 'Server error while checking email.' });
        }
    };
}

export default UserController;