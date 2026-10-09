export type userRoles = 'Admin' | 'User';

export interface User{
    id: number;
    name: string;
    surname: string;
    role: userRoles;
    email: string;
    phone: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}