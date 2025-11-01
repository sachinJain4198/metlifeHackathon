import { createSlice } from "@reduxjs/toolkit";

const allClaimsSlice = createSlice({
  name: "allClaims",
  initialState: {
    claims: [
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 600000,
        desc: "Decription",
        claimsStatus: "REJECTED",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 1000000,
        desc: "Decription",
        claimsStatus: "APPROVED",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 1200000,
        desc: "Decription",
        claimsStatus: "PENDING",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 100000,
        desc: "Decription",
        claimsStatus: "PENDING",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        submissionDate: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 7800000,
        desc: "Decription",
        claimsStatus: "APPROVED",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 6600000,
        desc: "Decription",
        claimsStatus: "PENDING",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 6200000,
        desc: "Decription",
        claimsStatus: "REJECTED",
        submissionDate: new Date().toLocaleString(),
      },
      {
        id: crypto.randomUUID(),
        policyId: crypto.randomUUID(),
        policyHolderName: "Varun Ingle",
        dateOfBirth: new Date().toLocaleString(),
        claimType: "CASH",
        userId: crypto.randomUUID(),
        amount: 6200000,
        desc: "Decription",
        claimsStatus: "FRAUD",
        submissionDate: new Date().toLocaleString(),
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

export const { setClaims, setLoading, setError } = allClaimsSlice.actions;
export default allClaimsSlice.reducer;
