import './SignForm.scss';

import React, {
    ChangeEvent,
    FormEvent,
    HTMLAttributes,
    useCallback,
    useState,
} from 'react';

import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAuth } from '@/hooks/useAuth';

const SignUpForm = (props: HTMLAttributes<HTMLFormElement>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { registration } = useAuth();

    const onSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            registration.mutate(
                { firstName, lastName, email, password },
                {
                    onSuccess: () => {
                        navigate('/home');
                    },
                },
            );
        },
        [firstName, lastName, email, password, dispatch],
    );

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
                disabled={registration.isPending}
            >
                {registration.isPending ? 'Registration...' : 'Registration'}
            </button>
        </form>
    );
};

export default SignUpForm;
