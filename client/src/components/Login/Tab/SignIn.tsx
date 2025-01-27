import { ChangeEvent, FormEvent, useCallback } from 'react';

const SignIn = () => {
    const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="regInputFirstName">First Name</label>
                <input
                    id="regInputFirstName"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="regInputLastName">Last Name</label>
                <input
                    id="regInputLastName"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="regInputEmail">Email address</label>
                <input
                    id="regInputEmail"
                    type="email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>

            <div className="form-group">
                <label htmlFor="regInputPassword">Password</label>
                <input
                    id="regInputPassword"
                    type="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                />
            </div>
        </form>
    );
};

export default SignIn;
