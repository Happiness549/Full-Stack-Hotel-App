import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { UserData } from './RegisterSlice';
import { saveUser, getUser } from '../utils/localStoprage'; 

interface LoginState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: LoginState = {
  userData: getUser(),
  loading: false,
  error: null,
  success: null,
};


export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const email = state.user.signupForm.email;
      const password = state.user.signupForm.password;

      if (!email || !password) {
        return rejectWithValue('Please enter your email and password');
      }

      // NOTE: Standard auth sends credentials via a POST request body
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/users/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      );

      if (!response.ok) {
        // Checks for common backend error messages or falls back
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to reach authentication server');
      }

      const userData: UserData = await response.json();
      return userData;

    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'login/updateUser',
  async (updatedUser: UserData, { rejectWithValue }) => {
    try {
      // FIXED: Removed the incorrect ":id" placeholder from the string
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/users/${updatedUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const user: UserData = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  }
);

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    clearLoginMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        saveUser(action.payload);
        state.success = 'Login successful!';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Invalid email or password';
        state.success = null;
        state.userData = null;
      })

      .addCase(updateUser.pending,(state)=>{
        state.loading = true;
        state.error = null;
        state.success =null
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.loading =false;
        state.userData =action.payload;
        saveUser(action.payload);
        state.success = "Profile updated successfully!";
        state.error = (action.payload as any) || "Failed to update profile";
        state.success = null;
      })
  },
});

export const { logout, clearLoginMessage } = LoginSlice.actions;
export default LoginSlice.reducer;
