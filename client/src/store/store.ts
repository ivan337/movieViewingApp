import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import { authApi } from '@/services/auth';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

//setupListeners(store.dispatch);
export default store;
