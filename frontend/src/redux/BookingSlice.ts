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



export const fetchMyBookings = createAsyncThunk<
  Booking[],
  void,
  { state: RootState; rejectValue: string }
>("bookings/fetchMyBookings", async (_, { getState, rejectWithValue }) => {
  const token = getState().login.token;

  if (!token) {
    return rejectWithValue("No authentication token found");
  }

  try {
    const response = await fetch(`${API_URL}/my-bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch your bookings");
    }

    return (await response.json()) as Booking[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
});



export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (
    {userId,roomId,bookingData,token,}: {userId: number; roomId: number; bookingData: 
      {checkin: string;checkout: string;guests: number;room_booked: number;total_price: number;};
      token: string;
    },{ rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/bookings/${userId}/room/${roomId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add booking");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add booking"
      );
    }
  }
);


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
      })
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch your bookings";
      })
      .addCase(addBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );

        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


      
  },
});

export default bookingSlice.reducer;

