import { createSlice } from "@reduxjs/toolkit";

const claimsSlice = createSlice({
  name: "claims",
  initialState: {
    claims: [
      {
        id: crypto.randomUUID(),
        title: "Total Claims",
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 600000,
        desc: "Decription",
        claimsStatus: "REJECTED",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Claims",
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 1000000,
        desc: "Decription",
        claimsStatus: "APPROVED",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Claims",
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 1200000,
        desc: "Decription",
        claimsStatus: "PENDING",
      },
      {
        id: crypto.randomUUID(),
        title: "Total Claims",
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 100000,
        desc: "Decription",
        claimsStatus: "PENDING",
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    setClaims(state, action) {
      state.claims = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setClaims, setLoading, setError } = claimsSlice.actions;
export default claimsSlice.reducer;
