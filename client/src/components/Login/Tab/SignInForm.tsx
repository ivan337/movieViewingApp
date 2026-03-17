import './SignForm.scss';

import {
    ChangeEvent,
    FormEvent,
    HTMLAttributes,
    useCallback,
    useState,
} from 'react';

import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';

const RoundedInput = styled(Input)`
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
`;

const SignInForm = (props: HTMLAttributes<HTMLFormElement>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth();

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            login.mutate(
                { email, password },
                {
                    onSuccess: () => {
                        navigate('/home');
                    },
                },
            );
        },
        [email, password, dispatch],
    );

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
                disabled={login.isPending}
            >
                {login.isPending ? 'Logging in...' : 'Login'}
            </button>
            <div>{login.error?.message}</div>
        </form>
    );
};

export default SignInForm;
