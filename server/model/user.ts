export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    dateOfBirth?: Date;
}