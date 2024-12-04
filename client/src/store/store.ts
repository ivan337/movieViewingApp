import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});

setupListeners(store.dispatch);
export default store;
