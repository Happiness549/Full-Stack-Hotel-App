import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const API_URL = "https://full-stack-hotel-app.onrender.com/api/bookings";

export type BookingStatus = | "Confirmed" | "Pending" | "Cancelled" | "Approved";

export interface Booking {
  id: number;
  user_id: number;
  room_id: number;
  guests: number;
  rooms_booked: number;
  total_price: number;
  status: BookingStatus;
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk<Booking[], void,
  { state: RootState; rejectValue: string }>
  ("bookings/fetchBookings", async (_, { getState, rejectWithValue }) => {
  const token = getState().login.token;

  if (!token) {
    return rejectWithValue("No authentication token found");
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return (await response.json()) as Booking[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
});


export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async (
    { id, status }: { id: number; status: BookingStatus },
    { getState, rejectWithValue }
  ) => {
    const token = (getState() as RootState).login.token;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update booking");
      }

      const data = await response.json();
      return data.booking as Booking;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);


const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch bookings";
      });
  },
});

export default bookingSlice.reducer;

