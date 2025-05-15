import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface User {
    id: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
    weight: number;
    height: number;
}

export class UserModel {
    private db: DocumentClient;
    private tableName: string;

    constructor(db: DocumentClient, tableName: string) {
        this.db = db;
        this.tableName = tableName;
    }

    async createUser(user: User): Promise<User> {
        const params = {
            TableName: this.tableName,
            Item: user,
        };
        await this.db.put(params).promise();
        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const params = {
            TableName: this.tableName,
            Key: { id },
        };
        const result = await this.db.get(params).promise();
        return result.Item as User || null;
    }

    async updateUser(user: User): Promise<User> {
        const params = {
            TableName: this.tableName,
            Key: { id: user.id },
            UpdateExpression: 'set fullName = :fullName, email = :email, mobileNumber = :mobileNumber, dateOfBirth = :dateOfBirth, weight = :weight, height = :height',
            ExpressionAttributeValues: {
                ':fullName': user.fullName,
                ':email': user.email,
                ':mobileNumber': user.mobileNumber,
                ':dateOfBirth': user.dateOfBirth,
                ':weight': user.weight,
                ':height': user.height,
            },
            ReturnValues: 'ALL_NEW',
        };
        const result = await this.db.update(params).promise();
        return result.Attributes as User;
    }
}