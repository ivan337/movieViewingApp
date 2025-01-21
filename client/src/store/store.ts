import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authReducer from '@/features/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

setupListeners(store.dispatch);
export default store;
