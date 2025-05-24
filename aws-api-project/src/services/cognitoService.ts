import { CognitoIdentityServiceProvider } from 'aws-sdk';

export class CognitoService {
    private cognito: CognitoIdentityServiceProvider;
    private userPoolId: string;

    constructor() {
        this.cognito = new CognitoIdentityServiceProvider({
            region: process.env.AWS_REGION,
        });
        this.userPoolId = process.env.COGNITO_USER_POOL_ID || '';
    }

    public async createUser(username: string, email: string, password: string, nickname: string) {
        // 1. Crea el usuario con adminCreateUser
        const params = {
            UserPoolId: this.userPoolId,
            Username: username,
            TemporaryPassword: password,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'nickname', Value: nickname },
                { Name: 'email_verified', Value: 'true' }, // <-- Esto es clave
            ],
            MessageAction: 'SUPPRESS',
        };

        const response = await this.cognito.adminCreateUser(params).promise();

        // 2. Establece la contraseña como permanente y confirma al usuario
        await this.cognito.adminSetUserPassword({
            UserPoolId: this.userPoolId,
            Username: username,
            Password: password,
            Permanent: true,
        }).promise();

        return {
            UserSub: response.User?.Username,
        };
    }

    public async deleteUser(userId: string) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: userId,
        };

        await this.cognito.adminDeleteUser(params).promise();
    }

    public async findUserByEmail(email: string) {
        const params = {
            UserPoolId: this.userPoolId,
            Filter: `email = "${email}"`,
            Limit: 1,
        };
        const result = await this.cognito.listUsers(params).promise();
        return result.Users && result.Users.length > 0 ? result.Users[0] : null;
    }
}