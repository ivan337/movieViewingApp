import {
    FormEvent,
    HTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import classes from '@/components/Login/Login.module.scss';
import Button from '@/components/UI/button';
import Input from '@/components/UI/input';
import { setError, setToken } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/services/auth';
import { appendCookie } from '@/utils/cookie';

const SignUp = (props: HTMLAttributes<HTMLFormElement>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const loginMutation = useLoginMutation();

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                const resp = await loginMutation.mutateAsync({
                    email,
                    password,
                });

                if (resp.accessToken && resp.refreshToken) {
                    dispatch(
                        setToken({
                            accessToken: resp.accessToken,
                            isAuthenticated: true,
                            error: '',
                        }),
                    );

                    appendCookie('refreshToken', resp.refreshToken, 14, true);

                    sessionStorage.setItem('accessToken', resp.accessToken);
                }
            } catch (e) {
                const errorMessage = e.response?.data?.message || e.message;

                dispatch(setError(errorMessage));
            }
        },
        [email, password, dispatch, loginMutation],
    );

    useEffect(() => {
        dispatch(setError(''));
    }, [email, password, dispatch]);

    return (
        <form onSubmit={onSubmit} className={classes.login__form}>
            <div className={classes.login__inputBox}>
                <Input
                    className={classes.login__inputText}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    type={'text'}
                    placeholder={'Логин'}
                />
                <FaUser className={classes.login__icon} />
            </div>

            <div className={classes.login__inputBox}>
                <Input
                    className={classes.login__inputText}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                    placeholder={'Пароль'}
                />
                <FaLock className={classes.login__icon} />
            </div>

            <div className={classes.login__checkbox}>
                <Input
                    className={classes.login__inputCheckbox}
                    type={'checkbox'}
                />
                <label className={classes.login__inputCheckbox_label}>
                    Запомнить логин
                </label>
            </div>

            <Button
                className={classes.login__submitButton}
                type={'submit'}
                disabled={loginMutation.isLoading}
            >
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
};

export default SignUp;
