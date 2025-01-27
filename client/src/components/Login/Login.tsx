import { HTMLAttributes } from 'react';

import { useSelector } from 'react-redux';

import classes from './Login.module.scss';

import SignIn from '@/components/Login/Tab/SignIn';
import SignUp from '@/components/Login/Tab/SignUp';
import { selectAuthError } from '@/features/auth/authSlice';

const Login = (props: HTMLAttributes<HTMLDivElement>) => {
    const error = useSelector(selectAuthError);

    return (
        <div className={`${classes.login} ${props.className}`}>
            <div className={classes.login__header}>
                <div className={classes.login__headerImage} />
            </div>
            <div className={classes.login__content}>
                <div className={classes.login__navigator}></div>
                <SignIn />
                <SignUp />
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
};

export default Login;
