import { useMutation } from 'react-query';
import axios from 'axios';

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
    'Authorization': ''
  };

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    headers['Authorization']   = `Bearer ${accessToken}`;
  }

  return headers;
};

const login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
  const response = await axios.post(`${baseUrl}/login`, credentials, {
    headers: prepareHeaders(),
  });
  return response.data;
};

const registration = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
  const response = await axios.post(`${baseUrl}/registration`, credentials, {
    headers: prepareHeaders(),
  });
  return response.data;
};

const logout = async (): Promise<void> => {
  await axios.post(`${baseUrl}/logout`, null, {
    headers: prepareHeaders(),
  });
};

export const useLoginMutation = () => useMutation(login);
export const useRegistrationMutation = () => useMutation(registration);
export const useLogoutMutation = () => useMutation(logout);
