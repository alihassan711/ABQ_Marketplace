import { createSlice } from '@reduxjs/toolkit'


 const accountSlice = createSlice({
  name: 'account',
  initialState:{value:null},
  reducers: {
  
    getaccount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {getaccount } = accountSlice.actions

export default accountSlice.reducer