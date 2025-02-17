import { HTMLAttributes } from 'react';

import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import SignInForm from '@/components/Login/Tab/SignInForm';
import SignUpForm from '@/components/Login/Tab/SignUpForm';
import Tabs from '@/components/ui/Tabs';
import { selectAuthError } from '@/features/auth/authSlice';

const LoginContainer = styled.div`
    height: 410px;
    width: 340px;
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    color: #fff;
    backdrop-filter: blur(14px);
    box-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.4);
`;
const LoginHeader = styled.div`
    height: 80px;
    min-height: 80px;
    width: 100%;
`;
const LoginLogo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;
const LoginError = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    margin: 4px 10% 4px 10%;
    height: 30px;
`;

const Login = (props: HTMLAttributes<HTMLDivElement>) => {
    const error = useSelector(selectAuthError);

    const tabs = [
        { id: 'signin', label: 'Sign In', content: <SignInForm /> },
        { id: 'signup', label: 'Sign Up', content: <SignUpForm /> },
    ];

    return (
        <LoginContainer {...props}>
            <LoginHeader>
                <LoginLogo src="" alt="Logo" hidden />
            </LoginHeader>

            <Tabs tabs={tabs} initialTab={'signin'} />

            {error && <LoginError>Error: {error}</LoginError>}
        </LoginContainer>
    );
};

export default Login;
