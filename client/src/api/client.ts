import { redirect } from 'react-router';

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isActivated: boolean;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User; // Обычно API возвращает и пользователя
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    firstName?: string;
    lastName?: string;
}

interface ApiClientOptions {
    getAccessToken: () => string | null;
}

export class ApiClient {
    private baseUrl: string;
    private getAccessToken: () => string | null;
    private failedQueue: Array<{
        resolve: (value: void) => void;
        reject: (reason?: Error) => void;
    }> = [];

    constructor(baseUrl: string, options: ApiClientOptions) {
        this.baseUrl = baseUrl;
        this.getAccessToken = options.getAccessToken;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
    ): Promise<T> {
        try {
            return await this.executeRequest<T>(endpoint, options);
        } catch (error) {
            if (error instanceof Error && error.message === '401') {
                // Пытаемся обновить токен
                try {
                    await this.refreshToken();
                    // Повторяем запрос
                    return this.executeRequest<T>(endpoint, options);
                } catch (refreshError) {
                    redirect('/login');
                    throw new Error('Session expired');
                }
            }
            throw error;
        }
    }

    private async executeRequest<T>(
        endpoint: string,
        options: RequestInit,
    ): Promise<T> {
        const token = this.getAccessToken();

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            credentials: 'include',
        });

        if (response.status === 401) {
            throw new Error('401');
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response.json();
    }

    private async refreshToken(): Promise<void> {
        const response = await fetch(`${this.baseUrl}/user/refresh`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Refresh failed');
        }

        const data = await response.json();

        this.getAccessToken = () => data.accessToken;
    }

    // Публичные методы
    async login(credentials: LoginRequest) {
        return this.request<LoginResponse>('/user/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async logout() {
        const token = this.getAccessToken();

        const response = await fetch(`${this.baseUrl}/user/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return response.json();
    }

    async registration(credentials: RegisterRequest): Promise<LoginResponse> {
        return this.request<LoginResponse>('/user/registration', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async getProfile(): Promise<User> {
        return this.request<User>('/user/profile');
    }
}
