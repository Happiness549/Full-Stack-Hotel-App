import {createSlice, type PayloadAction} from '@reduxjs/toolkit'


 interface SearchState{
    searchTerm: string;
   
}


const initialState: SearchState = {
    searchTerm: '',
   
    
}

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) =>{
            state.searchTerm = action.payload;     
        },
        clearSearh: (state) => {
            state.searchTerm = ''
        },

    },
});

export const { setSearchTerm,  clearSearh} = SearchSlice.actions;
export default SearchSlice.reducer;