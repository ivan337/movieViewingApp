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

const prepareHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
    'idempotency-key': v4(),
  };

  const accessToken = sessionStorage.getItem('accessToken');

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
};

const login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
  const response = await axios.post(`${baseUrl}/login`, credentials, {
    headers: prepareHeaders(),
  });
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
  credentials: ILoginRequest,
): Promise<ILoginResponse> => {
  const response = await axios.post(`${baseUrl}/registration`, credentials, {
    headers: prepareHeaders(),
  });
  return response.data;
};

const logout = async (): Promise<void> => {
  await axios.post(
    `${baseUrl}/logout`,
    {},
    {
      headers: prepareHeaders(),
    },
  );
};

export const useLoginMutation = () => useMutation(login);

export const useRefreshTokenMutation = () => useMutation(refreshAccessToken);
export const useRegistrationMutation = () => useMutation(registration);
export const useLogoutMutation = () => useMutation(logout);
