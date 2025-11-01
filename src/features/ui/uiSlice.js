import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drawerOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen
    },
    setDrawer(state, action) {
      state.drawerOpen = action.payload
    },
  },
})

export const { toggleDrawer, setDrawer } = uiSlice.actions
export default uiSlice.reducer
