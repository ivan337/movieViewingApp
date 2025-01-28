import './SignUpForm.scss';

import React, {
    ChangeEvent,
    FormEvent,
    HTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from 'react';

import { useDispatch } from 'react-redux';

import { setError, setToken } from '@/features/auth/authSlice';
import { useRegistrationMutation } from '@/services/auth';

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
        [email, password, dispatch, registrationMutation],
    );

    useEffect(() => {
        dispatch(setError(''));
    }, [email, password, dispatch]);

    return (
        <form className={`signup__form ${props.className}`} onSubmit={onSubmit}>
            <div className="signup__input-group">
                <input
                    className="signup__input-text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFirstName(e.target.value)
                    }
                    placeholder="First Name"
                />
            </div>

            <div className="signup__input-group">
                <input
                    className="signup__input-text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setLastName(e.target.value)
                    }
                    placeholder="Last Name"
                />
            </div>

            <div className="signup__input-group">
                <input
                    className="signup__input-text"
                    type="email"
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    placeholder="Email address"
                />
            </div>

            <div className="signup__input-group">
                <input
                    className="signup__input-text"
                    type="password"
                    required={true}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    placeholder="Password"
                />
            </div>

            <button
                className="signup__submit-button"
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
