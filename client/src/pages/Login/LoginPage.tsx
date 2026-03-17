import React, { HTMLAttributes } from 'react';

import loginPageBackground from '@assets/images/background.jpg';
import { styled } from 'styled-components';

import Login from '@/components/Login/Login';
import News from '@/components/News/News';

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
        <LoginPageContainer>
            <Login />
            <News hidden />
        </LoginPageContainer>
    );
};

export default LoginPage;
