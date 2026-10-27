import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type{ PayloadAction } from "@reduxjs/toolkit";

export interface Hotel {
  id?: number;
  added_by: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  star_rating: number;
  facilities: string;
}


interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  isHotelModalOpen: boolean;
  editingHotel: Hotel | null;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
  isHotelModalOpen: false,
  editingHotel: null,
};


export const addHotel = createAsyncThunk(
  "hotels/addHotel",
  async (newHotel: Omit<Hotel, "id" | "added_by" | "created_at">,
    { getState, rejectWithValue }) => {
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

export const updateHotel = createAsyncThunk("items/updateListItem",
  async (updatedHotel: Hotel,
    { rejectWithValue, getState }) => {
      
      const state = getState() as RootState;
      const token = state.login.token;
      if(!token){
        return rejectWithValue("No authentication token found");
      }

    try {
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels/${updatedHotel.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(updatedHotel),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
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

export const deleteHotel = createAsyncThunk("hotels/deleteHotel",
  async (id: number,
    { getState, rejectWithValue }) => {

    const state = getState() as RootState;
    const token = state.login.token;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete hotel");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

const HotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    openHotelModal: (state) => {
      state.editingHotel = null;
      state.isHotelModalOpen = true;
    },
    closeHotelModal: (state) => {
      state.isHotelModalOpen = false;
    },
    setHotelModal: (state, action: PayloadAction<boolean>) => {
      state.isHotelModalOpen = action.payload;
    },
     startEditHotel: (state, action: PayloadAction<Hotel>) => {
      state.editingHotel =action.payload;
      state.isHotelModalOpen = true; 
    },
    clearEditHotel: (state) => {
      state.editingHotel = null;
      state.isHotelModalOpen =false;
    },
  },
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

      .addCase(updateHotel.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(updateHotel.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.hotels.findIndex((item) => item.id === action.payload.id);

          if (index !== -1) {
            state.hotels[index] = action.payload;
          }

          state.editingHotel = null;
          state.isHotelModalOpen = false;
        })

        .addCase(updateHotel.rejected, (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === "string" ? action.payload : "Failed to update item";
        })
        .addCase(deleteHotel.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(deleteHotel.fulfilled, (state, action) => {
          state.loading = false;
          state.hotels = state.hotels.filter(
            (hotel) => hotel.id !== action.payload
          );
        })

        .addCase(deleteHotel.rejected, (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Failed to delete hotel";
        })
        },
        });

export const { openHotelModal, closeHotelModal, setHotelModal,  clearEditHotel, startEditHotel,  } = HotelSlice.actions;

export default HotelSlice.reducer;