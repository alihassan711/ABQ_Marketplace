import { createSlice } from '@reduxjs/toolkit'



 const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState:{value:{}},
  reducers: {
    
    getmarketplace: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {getmarketplace } = marketplaceSlice.actions

export default marketplaceSlice.reducer