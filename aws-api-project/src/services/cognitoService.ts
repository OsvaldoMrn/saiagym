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

    public async createUser(username: string, email: string, password: string) {
        const params = {
            UserPoolId: this.userPoolId,
            Username: username, // <-- UUID u otro identificador único
            TemporaryPassword: password,
            UserAttributes: [
                { Name: 'email', Value: email },
            ],
        };

        const response = await this.cognito.adminCreateUser(params).promise();
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
}