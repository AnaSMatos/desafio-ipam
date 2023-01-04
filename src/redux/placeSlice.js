import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'place',
    initialState: {
        state: "",
        county:""
    },
    reducers:{
        changeState(state, {payload}){
            return {...state, state: payload}
        },
        changeCounty(state, {payload}){
            return {...state, county: payload}
        }
    }
})

export const { changeState, changeCounty } = slice.actions

export const selectPlace = state => (state.state, state.county)

export default slice.reducer