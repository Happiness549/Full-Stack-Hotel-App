import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Favourite {
  id: number;
  user_id: number;
  hotel_id: number;
}

interface FavouriteState {
  favourites: Favourite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavouriteState = {
  favourites: [],
  loading: false,
  error: null,
};


const API_URL = "https://full-stack-hotel-app.onrender.com/api/favourites";

export const fetchFavourites = createAsyncThunk<
  Favourite[],
  void,
  { state: RootState; rejectValue: string }
>(
  "favourites/fetchFavourites",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().login.token;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await fetch(`${API_URL}/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favourites");
      }

      const data = await response.json();
      const favourites = data.favourites;

      if (!Array.isArray(favourites)) {
        throw new Error("Invalid favourites response");
      }

      return favourites;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

export const addFavourite = createAsyncThunk<
  Favourite,
  number,
  { state: RootState; rejectValue: string }
>(
  "favourites/addFavourite",
  async (hotelId, { getState, rejectWithValue }) => {
    const token = getState().login.token;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await fetch(`${API_URL}/${hotelId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add favourite");
      }

      const data = await response.json();

      // The controller returns { message, favourites }.
      if (data.favourites) {
        return data.favourites as Favourite;
      }

      // If the database already contains this favourite,
      // the service may return null. Refresh the saved list.
      if (data.favourites === null) {
        const refreshResponse = await fetch(`${API_URL}/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!refreshResponse.ok) {
          throw new Error("Failed to refresh favourites");
        }

        const refreshData = await refreshResponse.json();
        const favourites = Array.isArray(refreshData)
          ? refreshData
          : refreshData.favourites;

        if (Array.isArray(favourites)) {
          const existingFavourite = favourites.find(
            (favourite: Favourite) => favourite.hotel_id === hotelId
          );

          if (existingFavourite) {
            return existingFavourite;
          }
        }
      }

      throw new Error("Favourite was not returned by the server");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

export const removeFavourite = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>(
  "favourites/removeFavourite",
  async (hotelId, { getState, rejectWithValue }) => {
    const token = getState().login.token;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await fetch(`${API_URL}/hotel/${hotelId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove favourite");
      }

      return hotelId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Error";
      })
      .addCase(addFavourite.fulfilled, (state, action) => {
        if (
          !state.favourites.some(
            (favourite) => favourite.hotel_id === action.payload.hotel_id
          )
        ) {
          state.favourites.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addFavourite.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? "Error";
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter(
          (favourite) => favourite.hotel_id !== action.payload
        );
        state.error = null;
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? "Error";
      });
  },
});

export default favouriteSlice.reducer;

