import {createSlice, createAsyncThunk,type PayloadAction} from '@reduxjs/toolkit'


export interface UserData{
    id: number;
    name: string;
    surname: string;
    role: string;
    email: string;
    cellNumber: string;
    password: string;
}

export interface signupForm{
    name: string;
    surname: string; 
    role: string;
    email: string;
    cellNumber: string;
    password: string;
   
}

export interface AuthState{
    user: UserData | null;
    signupForm: signupForm;
    loading: boolean;
    error: string | null;
    success: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    success: null,
    signupForm: {
        name: '',
        surname: '',
        role: '',
        email: '', 
        cellNumber: '',
        password: '',
        
    },
    
}

    
export const AuthRegistration = createAsyncThunk('auth/registration',
    async(newUser: Omit<UserData, "id">) =>{
        const response = await fetch('https://full-stack-hotel-app.onrender.com/api/users/register',{
            method: "POST",
            headers: { 
                'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });
        if(!response.ok){
            throw new Error("failed to add list")
        }

        const userData = await response.json();
        return userData;
        
    }
);


const signUpSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updatedInputField: (state, action: PayloadAction<{
        field: keyof signupForm;
        value: string;
    }>) => {

        state.signupForm[action.payload.field] = action.payload.value;
        },

        resetForm: (state) => {
      state.signupForm = { 
        name: '', 
        surname: '', 
        role: '',
        email: '', 
        cellNumber: '', 
        password: '',
        
    };
    },
    },

       extraReducers: (builder) => {
        builder
        .addCase(AuthRegistration.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })

        .addCase(AuthRegistration.fulfilled, (state, action) => {
            state.loading = false;
            state.success = "Account created successfully"
            state.user = action.payload
        
        })

        .addCase(AuthRegistration.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message || "SignUp failed.";

        });

    },
});

export const {updatedInputField, resetForm} = signUpSlice.actions

export default signUpSlice.reducer
