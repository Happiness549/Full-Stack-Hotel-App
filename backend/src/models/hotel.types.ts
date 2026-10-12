export type userRoles = 'Admin' | 'User';

export interface User{
    id: number;
    name: string;
    surname: string;
    role: userRoles;
    profile_image: string | null;
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

export interface HotelImage {
    id: number;
    hotel_id: number;
    image_url: string;
    is_primary: boolean;
    created_at: Date;
}


export interface Room {
    id: number;
    hotel_id: number;
    room_type: string;
    description: string | null;
    price_per_night: number;
    capacity: number;
    quantity: number;
    facilities: string | null;
    status: string;
    created_at: Date;
    updated_at: Date;
}