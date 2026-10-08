export type userRoles = 'Admin' | 'User';

export interface User{
    id: number;
    name: string;
    role: userRoles;
    email: string;
    phone: number;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
}