import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';

const rootReducer = combineReducers({
  example: exampleReducer,
  // Agrega más reducers aquí cuando los crees
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;