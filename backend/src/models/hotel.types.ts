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

export type bookingStatus = 'Confirmed' | 'Pending' | 'Cancelled'| 'Approved';
export interface Booking{
    id: number;
    user_id: number;
    room_id: number;
    check_in: Date;
    check_out: Date;
    guests: number;
    room_booked: number;
    total_price: number;
    status: bookingStatus;
    created_at: Date;
}


export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'refunded';

export interface Payment {
    id: number;
    booking_id: number;
    user_id: number;
    amount: number;
    currency: string;
    payment_method: string | null;
    transaction_id: string | null;
    status: PaymentStatus;
    paid_at: Date | null;
    created_at: Date;
    updated_at: Date;
}

export interface Notification {
    id: number;
    user_id: number;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    created_at: Date;
}


export interface Review {
    id: number;
    user_id: number;
    hotel_id: number;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
}