import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    error: string | null;
}

interface RootState {
    auth: AuthState;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;

            state.isAuthenticated = action.payload !== null;
            state.error = null;
        },
        logout: () => initialState,
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setToken, setError } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
