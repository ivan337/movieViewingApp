import React, { HTMLAttributes } from 'react';

import loginPageBackground from '@assets/images/background.jpg';
import { QueryClient, QueryClientProvider } from 'react-query';
import { styled } from 'styled-components';

import Login from '@/components/Login/Login';
import News from '@/components/News/News';

const queryClient = new QueryClient();

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: url(${loginPageBackground}) no-repeat center;
    background-size: 100% 100%;
`;

const LoginPage: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginPageContainer>
                <Login />
                <News hidden />
            </LoginPageContainer>
        </QueryClientProvider>
    );
};

export default LoginPage;
