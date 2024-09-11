import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './Reducers/todoSlice'

const store = configureStore({
  reducer: {
    todo: todoSlice,
  }
});

export default store