import './SignForm.scss';

import {
    ChangeEvent,
    FormEvent,
    HTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import { useLoginMutation } from '@/features/auth/authApi';
import { setError, setToken } from '@/features/auth/authSlice';
import { appendCookie } from '@/utils/cookie';

const RoundedInput = styled(Input)`
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
`;

const SignInForm = (props: HTMLAttributes<HTMLFormElement>) => {
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

                    localStorage.setItem('accessToken', resp.accessToken);
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
        <form className={`sign-form ${props.className}`} onSubmit={onSubmit}>
            <RoundedInput
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.currentTarget.value);
                }}
                type={'email'}
                placeholder={'Email address'}
                icon={<FaUser />}
            />

            <RoundedInput
                required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }}
                type={'password'}
                placeholder={'Password'}
                icon={<FaLock />}
            />

            <Checkbox
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    console.warn('тык', e.target.checked);
                }}
                label={'Запомнить логин'}
            />

            <button
                className="sign-form__submit-button"
                type="submit"
                disabled={loginMutation.isLoading}
            >
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default SignInForm;
