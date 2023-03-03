import { createSlice } from '@reduxjs/toolkit'



 const nftSlice = createSlice({
  name: 'nft',
  initialState:{value:{}},
  reducers: {
    getnft: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {getnft } = nftSlice.actions

export default nftSlice.reducer