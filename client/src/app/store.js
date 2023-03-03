import { configureStore ,getDefaultMiddleware} from '@reduxjs/toolkit'

import accountReducer from '../features/account/accountSlice'
import marketplaceReducer from '../features/marketplace/marketplaceSlice'
import nftReducer from '../features/nft/nftSlice'




export const store = configureStore({
  reducer: {
    account: accountReducer,
    marketplace: marketplaceReducer,
    nft: nftReducer,
 
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})