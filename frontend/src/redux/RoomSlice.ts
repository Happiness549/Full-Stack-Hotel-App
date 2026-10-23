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
  isRoomsModalOpen: boolean;
  isRoomModalOpen: boolean;
  selectedRoom: Room | null;

}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
  isRoomsModalOpen: false,
  isRoomModalOpen: false,
  selectedRoom: null,
};


export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (
    newRoom: Omit<Room, "id">,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels/${newRoom.hotel_id}/rooms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRoom),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add room");
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
    selectRoom: (state, action: PayloadAction<Room>) => {
     state.selectedRoom = action.payload;
     state.isRoomModalOpen = true;
},
    openRoomsModal: (state) => {
      state.isRoomsModalOpen = true;
    },
    closeRoomsModal: (state) => {
      state.isRoomsModalOpen = false;
    },
    setRoomsModal: (state, action: PayloadAction<boolean>) => {
      state.isRoomsModalOpen = action.payload;
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



export const { openRoomModal, closeRoomModal, selectRoom, openRoomsModal, closeRoomsModal, setRoomsModal } = RoomSlice.actions;

export default RoomSlice.reducer;


