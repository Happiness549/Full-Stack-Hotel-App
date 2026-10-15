import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { UserData } from './RegisterSlice';
import { getUser, saveUser, removeUser } from '../utils/localStoprage'; 

interface LoginResponse {
  user: UserData;
  token: string;
}

interface LoginState {
  userData: UserData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: LoginState = {
  userData: getUser()?.user ?? null,
  token: getUser()?.token ?? null,
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

      const response = await fetch(
        'https://full-stack-hotel-app.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to log in');
      }

      const data: LoginResponse = await response.json();
      return data;
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
      const response = await fetch(
        `https://full-stack-hotel-app.onrender.com/api/users/${updatedUser.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      return data.user ?? data;
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
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = null;
      removeUser();
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
        state.userData = action.payload.user;
        state.token = action.payload.token;

        saveUser(action.payload);

        state.success = 'Login successful!';
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Invalid email or password';
        state.success = null;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;

        state.success = 'Profile updated successfully!';
        state.error = null;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to update profile';
        state.success = null;
      });
  },
});

export const { logout, clearLoginMessage } = LoginSlice.actions;

export default LoginSlice.reducer;