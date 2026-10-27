
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Payment {
    id: number;
    booking_id: number;
    user_id: number;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
}


interface PaymentState {
    loading: boolean;
    error: string | null;
    checkout: PaystackResponse | null;
}

const initialState: PaymentState = {
    loading: false,
    error: null,
    checkout: null,
};




interface PaystackResponse {
    message: string;
    payment: Payment;
    paystackUrl: string;
    reference: string;
}


    export const createPayment = createAsyncThunk<
        PaystackResponse,
        { bookingId: number; token: string },
        { rejectValue: string }
    >(
        "payment/createPayment",
        async ({ bookingId, token }, { rejectWithValue }) => {
            try {
                const response = await fetch(
                    `https://full-stack-hotel-app.onrender.com/api/payments/${bookingId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    return rejectWithValue(
                        data.message || "Failed to create payment"
                    );
                }

                return data as PaystackResponse;
            } catch {
                return rejectWithValue("Something went wrong");
            }
        }
    );


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.checkout = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to create payment";
            });
    },
});

export default paymentSlice.reducer;
