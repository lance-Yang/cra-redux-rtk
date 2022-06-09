import { configureStore } from '@reduxjs/toolkit';
import loginApi from './loginApi';
import homeApi from './homeApi';
import homeReducer from './homeSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
	reducer: {
		[loginApi.reducerPath]: loginApi.reducer,
		[homeApi.reducerPath]: homeApi.reducer,
		home : homeReducer
	},
	middleware: (middle) => middle().concat([ loginApi.middleware, homeApi.middleware ])
});
