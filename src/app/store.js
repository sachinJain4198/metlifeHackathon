import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice.js";
import claimsReducer from "../features/claims/claimsSlice.js";
import allClaimsReducer from "../features/claims/claimDataSlice.js";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    claims: claimsReducer,
    allClaims: allClaimsReducer,
  },
});

export default store;
