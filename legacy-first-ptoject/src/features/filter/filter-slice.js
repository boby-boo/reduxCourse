import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: '@@filter',
    initialState: [],
    reducers: {
        addFilter: (state, action) => {
            if (!state.includes(action.filter)) {
                state.push(action.payload)
            } 
        },
        removeFilter: (state, action) => {
            return state.filter(item => item !== action.payload)
        },
        clearFilter: () => []
    }
})

export const { addFilter, removeFilter, clearFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const selectFiltres = state => state.filters