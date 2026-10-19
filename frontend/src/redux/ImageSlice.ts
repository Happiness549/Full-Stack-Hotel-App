
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type{ RootState } from "../store";

export interface HotelImage {
  id: number;
  hotel_id: number;
  image_url: string;
  is_primary: boolean;
}

interface HotelImageState {
  images: HotelImage[];
  loadedHotelIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelImageState = {
  images: [],
  loadedHotelIds: [],
  loading: false,
  error: null,
};

export const uploadHotelImage = createAsyncThunk(
  "hotels/uploadHotelImage",
  async (
    { hotelId, image }: { hotelId: number; image: File },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.login.token;

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels/${hotelId}/images`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload hotel image");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);


export const fetchHotelImages = createAsyncThunk(
  "hotelImages/fetchHotelImages",
  async (hotelId: number) => {
    const response = await fetch(
      `https://full-stack-hotel-app.onrender.com/api/hotels/${hotelId}/images`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hotel images");
    }

    return (await response.json()) as HotelImage[];
  }
);

const HotelImageSlice = createSlice({
  name: "hotelImages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelImages.fulfilled, (state, action) => {
            state.loading = false;
            const hotelId = action.meta.arg;
            state.images = state.images.filter(
                (image) => image.hotel_id !== hotelId
        );

        state.images.push(...action.payload);

            if (!state.loadedHotelIds.includes(hotelId)) {
                state.loadedHotelIds.push(hotelId);
        }
        })
      .addCase(fetchHotelImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch images";
      });
  },
});

export default HotelImageSlice.reducer;





