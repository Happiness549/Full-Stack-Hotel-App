import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import type{ RootState } from "../store";

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
  editingRooms: Room | null;

}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
  isRoomsModalOpen: false,
  isRoomModalOpen: false,
  selectedRoom: null,
  editingRooms: null,
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

export const updateRooms = createAsyncThunk(
  "rooms/updateRooms",
  async (
    updatedRoom: Room,
    { rejectWithValue, getState }
    
  ) => {
    const state = getState() as RootState;
    const token = state.login.token;
    try {
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels/${updatedRoom.hotel_id}/rooms/${updatedRoom.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
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


export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (  { id, hotelId }: { id: number; hotelId: number },
  { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.login.token;

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    try {
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/hotels/${hotelId}/rooms/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);


const RoomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    openRoomModal: (state) => {
       state.selectedRoom = null;
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
    startEditRoom: (state, action: PayloadAction<Room>) => {
          state.editingRooms =action.payload;
          state.isRoomModalOpen = true; 
        },
        clearEditRoom: (state) => {
          state.editingRooms = null;
          state.isRoomModalOpen =false;
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
    })

    // UPDATE
        .addCase(updateRooms.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(updateRooms.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.rooms.findIndex((item) => item.id === action.payload.id);

          if (index !== -1) {
            state.rooms[index] = action.payload;
          }

          state.editingRooms = null;
          state.isRoomsModalOpen = false;
        })

        .addCase(updateRooms.rejected, (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === "string" ? action.payload : "Failed to update room";
        })
        .addCase(deleteRoom.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
          state.loading = false;
          state.rooms = state.rooms.filter(
            (room) => room.id !== action.payload
          );
        })
        .addCase(deleteRoom.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
},
});



export const { openRoomModal, closeRoomModal, selectRoom, openRoomsModal, closeRoomsModal, setRoomsModal, startEditRoom, clearEditRoom } = RoomSlice.actions;

export default RoomSlice.reducer;


