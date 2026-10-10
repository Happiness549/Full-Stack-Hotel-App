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

export interface Hotel {
    id: number;
    added_by: number | null;
    name: string;
    description: string | null;
    address: string;
    city: string;
    country: string;
    star_rating: number | null;
    facilities: string | null;
    status: string;
    created_at: Date;
}