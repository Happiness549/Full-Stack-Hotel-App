import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type{ RootState } from "../store";

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

export const addReview = createAsyncThunk(
  "reviews/addReview",async ({hotelId, rating, comment,}: {hotelId: number; rating: number; comment: string;},
     { getState, rejectWithValue }
  ) => {
    
          const state = getState() as RootState;
          const token = state.login.token;
          if(!token){
            return rejectWithValue("No authentication token found");
          }
    const response = await fetch(`https://full-stack-hotel-app.onrender.com/api/reviews/${hotelId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add review");
    }

    return response.json();
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({id, rating, comment,}: {id: number; rating: number; comment: string;},
    { getState, rejectWithValue }) => {
    
    const state = getState() as RootState;
    const token = state.login.token;

    const response = await fetch(
      `https://full-stack-hotel-app.onrender.com/api/reviews/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to update review");
    }

    return response.json();
  }
);


export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id: number, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.login.token;

    const response = await fetch(
      `https://full-stack-hotel-app.onrender.com/api/reviews/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to delete review");
    }

    return id;
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
      })

      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload.review);
        })
        .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error =(action.payload as string) || action.error.message || "Failed to add review";
     })

     .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.reviews.findIndex(
            (review) => review.id === action.payload.id
        );

        if (index !== -1) {
            state.reviews[index] = action.payload;
        }
        })
        .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error =
            (action.payload as string) ||
            action.error.message ||
            "Failed to update review";
        })

        
        .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
            (review) => review.id !== action.payload
        );
        })
        .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error =
            (action.payload as string) ||
            action.error.message ||
            "Failed to delete review";
        })

  },
})

export default reviewSlice.reducer