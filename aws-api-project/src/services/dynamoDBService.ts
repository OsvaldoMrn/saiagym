import { DynamoDB } from 'aws-sdk';

export class DynamoDBService {
    private db: DynamoDB.DocumentClient;
    private tableName: string;

    constructor() {
        this.db = new DynamoDB.DocumentClient({
            region: process.env.AWS_REGION
        });
        this.tableName = process.env.DYNAMODB_TABLE_NAME || '';
    }

    public async saveUser(user: any) {
        const params = {
            TableName: this.tableName,
            Item: user,
        };

        await this.db.put(params).promise();
    }

    public async getUser(userId: string) {
        const params = {
            TableName: this.tableName,
            Key: { id: userId },
        };

        const result = await this.db.get(params).promise();
        return result.Item;
    }

    public async updateUser(userId: string, updates: any) {
        const updateExpression = Object.keys(updates)
            .map((key, index) => `#key${index} = :value${index}`)
            .join(', ');

        const expressionAttributeNames = Object.keys(updates).reduce((acc, key, index) => {
            acc[`#key${index}`] = key;
            return acc;
        }, {} as any);

        const expressionAttributeValues = Object.keys(updates).reduce((acc, key, index) => {
            acc[`:value${index}`] = updates[key];
            return acc;
        }, {} as any);

        const params = {
            TableName: this.tableName,
            Key: { id: userId },
            UpdateExpression: `SET ${updateExpression}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
        };

        await this.db.update(params).promise();
    }

    public async deleteUser(userId: string) {
        const params = {
            TableName: this.tableName,
            Key: { id: userId },
        };

        await this.db.delete(params).promise();
    }
}