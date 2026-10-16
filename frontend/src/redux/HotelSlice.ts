import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Hotel {
  id?: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  star_rating: number;
  facilities: string[];
  status?: string;
}


interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
};

// ADD HOTEL — Admin only
export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async (
    newHotel: Omit<Hotel, "id">,
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const user = state.login.user;
      const token = state.login.token;

      if (!user || !token) {
        return rejectWithValue("You must be logged in");
      }

      if (user.role !== "Admin") {
        return rejectWithValue("Only admins can add hotels");
      }

      const response = await fetch(
        "https://full-stack-hotel-app.onrender.com/api/hotels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newHotel),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(
          errorData.message || "Failed to add hotel"
        );
      }

      const data: Hotel = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

const HotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels.push(action.payload);
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add hotel";
      });
  },
});

export default HotelSlice.reducer;