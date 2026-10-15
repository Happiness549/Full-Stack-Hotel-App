import {createAsyncThunk,createSlice,} from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { UserData } from "./SignupSlice";



interface LoginState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}


const initialState: LoginState = {
  userData: null,
  loading: false,
  error: null,
  success: null,
};


export const loginUser = createAsyncThunk(
  "login/loginUser",


  async (_, { getState, rejectWithValue }) => {
      
    try {
          const state = getState() as RootState;
          const email = state.user.signupForm.email;
          const password = state.user.signupForm.password;
      

          if (!email || !password) {
            return rejectWithValue(
            "Please enter your email and password"
            );
      }

          const response = await fetch(
            `http://localhost:3000/users?email=${encodeURIComponent(
              email
            )}&password=${encodeURIComponent(password)}`
          );

          if (!response.ok) {
            throw new Error("Failed to login");
          }

          const users: UserData[] = await response.json();

        
          if (users.length === 0) {
            return rejectWithValue(
              "Invalid email or password"
            );
          }

    
      return users[0];

    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);



const LoginSlice = createSlice({
  name: "login",

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

    
    builder.addCase(
      loginUser.pending,
      (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      }
    );



    builder.addCase(
      loginUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.success = "Login successful!";
        state.error = null;
      }
    );


    
    builder.addCase(
      loginUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.payload as string ||
          "Invalid email or password";
        state.success = null;
        state.userData = null;
      }
    );
  },
});

export const {logout,clearLoginMessage,} = LoginSlice.actions;
export default LoginSlice.reducer;




