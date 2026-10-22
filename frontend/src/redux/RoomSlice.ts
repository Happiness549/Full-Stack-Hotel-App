import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type{ PayloadAction } from "@reduxjs/toolkit";

export interface Room {
    id: number;
    hotel_id: number;
    room_type: string;
    description: string | null;
    price_per_night: number;
    capacity: number;
    quantity: number;
    facilities: string | null;
    created_at: Date;
    updated_at: Date;
}

interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: string | null;

}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null
};


export const addRoom = createAsyncThunk(
  "hotels/addHotel",
  async (newRoom: Omit<Room, "id" | "created_at" | "updated_at">,{ getState, rejectWithValue }) => {
    try {


      const response = await fetch(
        "https://full-stack-hotel-app.onrender.com/api/hotels/${hotel.id}",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRoom),
        }
      );

    if (!response.ok) {
        throw new Error("Failed to add list");
      }

      const data: Room = await response.json();

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


