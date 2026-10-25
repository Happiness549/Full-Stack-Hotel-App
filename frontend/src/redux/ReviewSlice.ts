import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Review {
  id: number;
  user_id: number;
  hotel_id: number;
  rating: number;
  comment: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};


export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const response = await fetch(
      "https://full-stack-hotel-app.onrender.com/api/reviews"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return (await response.json()) as Review[];
  }
);


const reviewSlice = createSlice({
  name: "reviews",
  initialState,
reducers:{},
extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      });
  },
})

export default reviewSlice.reducer