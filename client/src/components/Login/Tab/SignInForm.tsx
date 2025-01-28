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

import Button from '@/components/UI/button';
import Input from '@/components/UI/input';
import { setError, setToken } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/services/auth';
import { appendCookie } from '@/utils/cookie';

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
        <form className={`sign-form ${props.className}`} onSubmit={onSubmit}>
            <div className="sign-form__input-group sign-form__input-group--center">
                <Input
                    className="sign-form__input-text"
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    type="email"
                    placeholder="Email address"
                />
                <FaUser className="sign-form__icon" />
            </div>

            <div className="sign-form__input-group sign-form__input-group--center">
                <Input
                    className="sign-form__input-text"
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    type={'password'}
                    placeholder="Password"
                />
                <FaLock className="sign-form__icon" />
            </div>

            <div className="sign-form__input-group">
                <Input
                    className="sign-form__input-checkbox"
                    type="checkbox"
                    id="signinInputCheckbox"
                    onChange={() => {}}
                />
                <label
                    htmlFor="signinInputCheckbox"
                    className="sign-form__input-checkbox-label"
                >
                    Запомнить логин
                </label>
            </div>

            <Button
                className="sign-form__submit-button"
                type="submit"
                disabled={loginMutation.isLoading}
            >
                {loginMutation.isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    );
};

export default SignInForm;
