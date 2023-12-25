import {configureStore} from '@reduxjs/toolkit'
import cardslice from './slice/cardslice';

export const store =configureStore({
    reducer:{
       cart:cardslice,
    }
});