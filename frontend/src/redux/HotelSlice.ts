import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Hotel {
  id?: number;
  added_by?: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  star_rating: number;
  facilities: string;
  status?: string;
  created_at: Date;
}


interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  isListModalOpen: boolean;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
  isListModalOpen: false,
};


export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async (
    newHotel: Omit<Hotel, "id">,
    { getState, rejectWithValue }
  ) => {
    try {

      const state = getState() as RootState;
      const token = state.login.token;
      if(!token){
        return rejectWithValue("No authentication token found");
      }


      const response = await fetch(
        "https://full-stack-hotel-app.onrender.com/api/hotels",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newHotel),
        }
      );

    if (!response.ok) {
        throw new Error("Failed to add list");
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


export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotelss",
  async (_, {  rejectWithValue }) => {
    try {
     
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels`
      );

      
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }

      const data: Hotel[] = await response.json();

      
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
      })

       .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })

      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch shopping lists";
      })
  },
});

export default HotelSlice.reducer;