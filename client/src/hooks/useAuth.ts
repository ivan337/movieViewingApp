import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoginRequest, RegisterRequest } from '@/api/client';
import { setAccessToken } from '@/features/auth/authSlice';
import { useApiClient } from '@/hooks/useApiClient';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const apiClient = useApiClient();
    const queryClient = useQueryClient();
    const accessToken = useAppSelector(
        (state) => state.authReducer.accessToken,
    );

    const isAuth = !!accessToken;

    const login = useMutation({
        mutationFn: (credentials: LoginRequest) => apiClient.login(credentials),
        onSuccess: (data) => {
            dispatch(setAccessToken(data.accessToken));
            queryClient.setQueryData(['profile'], data.user);
        },
    });

    const logout = useMutation({
        mutationFn: () => apiClient.logout(),
        onSuccess: () => {
            dispatch(setAccessToken(null));
            queryClient.clear();
        },
    });

    const registration = useMutation({
        mutationFn: (credentials: RegisterRequest) =>
            apiClient.registration(credentials),
        onSuccess: (data) => {
            dispatch(setAccessToken(data.accessToken));
            queryClient.setQueryData(['profile'], data.user);
        },
    });

    return {
        isAuth,
        login,
        logout,
        registration,
    };
};
