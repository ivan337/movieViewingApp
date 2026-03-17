import { ApiClient } from '@/api/client';
import { useAppSelector } from '@/store/store';

const API_URL = 'http://localhost:5000/api'; //process.env.NEXT_PUBLIC_API_URL ||

export const useApiClient = () => {
    const accessToken = useAppSelector(
        (state) => state.authReducer.accessToken,
    );

    return new ApiClient(API_URL, {
        getAccessToken: () => accessToken,
    });
};
