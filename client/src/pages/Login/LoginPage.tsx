import React, { HTMLAttributes } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import './LoginPage.scss';

import Login from '@/components/Login';
import News from '@/components/News';

const queryClient = new QueryClient();

const LoginPage: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container login_form-background ">
                <Login className="login" />
                <News className="news" />
            </div>
        </QueryClientProvider>
    );
};

export default LoginPage;
