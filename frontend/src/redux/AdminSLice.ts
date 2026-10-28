import { createSlice } from "@reduxjs/toolkit";

interface AdminState {
  isAdminModalOpen: boolean;
}

const initialState: AdminState = {
  isAdminModalOpen: false,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    openAdminModal: (state) => {
      state.isAdminModalOpen = true;
    },
    closeAdminModal: (state) => {
      state.isAdminModalOpen = false;
    },
  },
});

export const { openAdminModal, closeAdminModal } = AdminSlice.actions;
export default AdminSlice.reducer;