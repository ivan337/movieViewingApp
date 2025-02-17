import './SignForm.scss';

import React, {
    ChangeEvent,
    FormEvent,
    HTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { useRegistrationMutation } from '@/features/auth/authApi';
import { setError } from '@/features/auth/authSlice';

const SignUpForm = (props: HTMLAttributes<HTMLFormElement>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const dispatch = useDispatch();

    const registrationMutation = useRegistrationMutation();

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                const resp = await registrationMutation.mutateAsync({
                    email,
                    password,
                    firstName,
                    lastName,
                });

                if (resp.accessToken && resp.refreshToken) {
                    console.warn('success');
                }
            } catch (e) {
                const errorMessage = e.response?.data?.message || e.message;

                dispatch(setError(errorMessage));
            }
        },
        [firstName, lastName, email, password, dispatch, registrationMutation],
    );

    useEffect(() => {
        dispatch(setError(''));
    }, [email, password, dispatch]);

    return (
        <form className={`sign-form ${props.className}`} onSubmit={onSubmit}>
            <div className="sign-form__input-group">
                <input
                    className="sign-form__input-text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFirstName(e.target.value)
                    }
                    placeholder="First Name"
                />
            </div>

            <div className="sign-form__input-group">
                <input
                    className="sign-form__input-text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setLastName(e.target.value)
                    }
                    placeholder="Last Name"
                />
            </div>

            <div className="sign-form__input-group  sign-form__input-group--center">
                <input
                    className="sign-form__input-text"
                    type="email"
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    placeholder="Email address"
                />

                <FaUser className="sign-form__icon" />
            </div>

            <div className="sign-form__input-group  sign-form__input-group--center">
                <input
                    className="sign-form__input-text"
                    type="password"
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    placeholder="Password"
                />

                <FaLock className="sign-form__icon" />
            </div>

            <button
                className="sign-form__submit-button"
                type="submit"
                disabled={registrationMutation.isLoading}
            >
                {registrationMutation.isLoading
                    ? 'Registration...'
                    : 'Registration'}
            </button>
        </form>
    );
};

export default SignUpForm;
