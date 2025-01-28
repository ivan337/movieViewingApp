import { HTMLAttributes, useState } from 'react';

import { useSelector } from 'react-redux';

import './Login.scss';

import SignInForm from '@/components/Login/Tab/SignInForm';
import SignUpForm from '@/components/Login/Tab/SignUpForm';
import { selectAuthError } from '@/features/auth/authSlice';

const Login = (props: HTMLAttributes<HTMLDivElement>) => {
    const error = useSelector(selectAuthError);
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

    return (
        <div className={`login ${props.className}`}>
            <div className="login__header">
                <div className="login__logo" />
            </div>
            <div className="login__content">
                <ul className="login__navigator">
                    <li
                        className={`login__navigator-item ${activeTab === 'signin' ? 'login__navigator-item--active' : ''}`}
                        onClick={() => setActiveTab('signin')}
                    >
                        <a href="#signin">Sign In</a>
                    </li>
                    <li
                        className={`login__navigator-item ${activeTab === 'signup' ? 'login__navigator-item--active' : ''}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        <a href="#signup">Sign Up</a>
                    </li>
                </ul>
                {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}

                {error && <div className="login__error">Error: {error}</div>}
            </div>
        </div>
    );
};

export default Login;
