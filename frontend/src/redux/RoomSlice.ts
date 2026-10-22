import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type{ PayloadAction } from "@reduxjs/toolkit";

export interface Room {
  id: number;
  hotel_id: number;
  room_type: string;
  description: string;
  price_per_night: number;
  capacity: number;
  quantity: number;
  facilities: string;
}

interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  isRoomModalOpen: boolean;

}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
  isRoomModalOpen: false,
};


export const addRoom = createAsyncThunk(
  "hotels/addHotel",
  async (newRoom: Omit<Room, "id" | "created_at" | "updated_at">,{ getState, rejectWithValue }) => {
    try {


      const response = await fetch(
        "https://full-stack-hotel-app.onrender.com/api/hotels/rooms",
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


export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async () => {
    const response = await fetch(
      `https://full-stack-hotel-app.onrender.com/api/hotels/rooms`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }

    const rooms: Room[] = await response.json();

    return rooms;
  }
);


const RoomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    openRoomModal: (state) => {
      state.isRoomModalOpen = true;
    },
    closeRoomModal: (state) => {
      state.isRoomModalOpen = false;
    },


    
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchRooms.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
    })
    .addCase(fetchRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch rooms";
    });
},
});



export const { openRoomModal, closeRoomModal } = RoomSlice.actions;

export default RoomSlice.reducer;


