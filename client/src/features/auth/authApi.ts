import axios from 'axios';
import { useMutation } from 'react-query';
import { v4 } from 'uuid';

const baseUrl = 'http://localhost:5000/api/user';

interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    isActivated: string;
}

interface ILoginRequest {
    email: string;
    password: string;
}

interface IRegisterRequest extends ILoginRequest {
    firstName?: string;
    lastName?: string;
}

const authApi = axios.create({
    baseURL: 'http://localhost:5000/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

authApi.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['idempotency-key'] = v4();

    return config;
});

const login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    const response = await axios.post(`${baseUrl}/login`, credentials);
    return response.data;
};

const refreshAccessToken = async (): Promise<ILoginResponse> => {
    const response = await axios.post(
        `${baseUrl}/refresh-token`,
        {},
        {
            withCredentials: true,
        },
    );
    return response.data;
};

const registration = async (
    credentials: IRegisterRequest,
): Promise<ILoginResponse> => {
    const response = await axios.post(`${baseUrl}/registration`, credentials);
    return response.data;
};

const logout = async (): Promise<void> => {
    await axios.post(`${baseUrl}/logout`);
};

export const useLoginMutation = () => useMutation(login);

export const useRefreshTokenMutation = () => useMutation(refreshAccessToken);
export const useRegistrationMutation = () => useMutation(registration);
export const useLogoutMutation = () => useMutation(logout);
