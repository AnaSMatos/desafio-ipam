import { configureStore } from "@reduxjs/toolkit";
import placeSlice from "./placeSlice.js";

export default configureStore({
    reducer:{
        place: placeSlice
    }
})