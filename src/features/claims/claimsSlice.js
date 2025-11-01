import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchClaims, fetchClaimDetails } from '../../services/api.js'

// Async thunk for fetching claims
export const getAllClaimsAsync = createAsyncThunk(
  'claims/getAllClaims',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      // Check if we already have claims data and don't force refresh
      const state = getState()
      if (!forceRefresh && state.claims.claims.length > 0) {
        // Return existing data without making API call
        return state.claims.claims
      }
      
      const data = await fetchClaims()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching individual claim details
export const getClaimDetailsAsync = createAsyncThunk(
  'claims/getClaimDetails',
  async (claimId, { rejectWithValue, getState }) => {
    try {
      // Check if we already have detailed data for this claim
      const state = getState()
      const existingClaim = state.claims.claimDetails[claimId]
      
      if (existingClaim && existingClaim.isDetailed) {
        // Return cached data if we already have detailed information
        return { claimId, claimData: existingClaim, fromCache: true }
      }
      
      const data = await fetchClaimDetails(claimId)
      return { claimId, claimData: data, fromCache: false }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  claims: [],
  claimDetails: {}, // Store individual claim details by claimId
  loading: false,
  detailsLoading: false,
  error: null,
  detailsError: null,
}

const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearDetailsError: (state) => {
      state.detailsError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all claims cases
      .addCase(getAllClaimsAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllClaimsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.claims = action.payload
        // Store basic claim data in claimDetails as well for caching
        action.payload.forEach(claim => {
          if (!state.claimDetails[claim.policyId]) {
            state.claimDetails[claim.policyId] = {
              ...claim,
              isDetailed: false // Mark as basic data only
            }
          }
        })
      })
      .addCase(getAllClaimsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get claim details cases
      .addCase(getClaimDetailsAsync.pending, (state) => {
        state.detailsLoading = true
        state.detailsError = null
      })
      .addCase(getClaimDetailsAsync.fulfilled, (state, action) => {
        state.detailsLoading = false
        const { claimId, claimData, fromCache } = action.payload
        
        if (!fromCache) {
          // Store detailed claim data
          state.claimDetails[claimId] = {
            ...claimData,
            isDetailed: true // Mark as detailed data
          }
        }
      })
      .addCase(getClaimDetailsAsync.rejected, (state, action) => {
        state.detailsLoading = false
        state.detailsError = action.payload
      })
  },
})

export const { clearError, clearDetailsError } = claimsSlice.actions
export default claimsSlice.reducer