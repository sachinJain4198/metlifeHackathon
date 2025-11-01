import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice.js'
import claimsReducer from '../features/claims/claimsSlice.js'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    claims: claimsReducer,
  },
});

export default store;
