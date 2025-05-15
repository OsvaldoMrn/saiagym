export interface User {
    id: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
    weight: number;
    height: number;
}

export interface CreateUserRequest {
    fullName: string;
    email: string;
    password: string;
    mobileNumber: string;
    dateOfBirth: string;
    weight: number;
    height: number;
}

export interface UpdateUserRequest {
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    dateOfBirth?: string;
    weight?: number;
    height?: number;
}