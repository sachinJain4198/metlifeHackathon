import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice.js'

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
})

export default store
