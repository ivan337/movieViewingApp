import { ButtonHTMLAttributes, forwardRef } from 'react';

import classes from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, Props>((props, ref) => {
    return (
        <button
            className={`${classes.button} ${props.className}`}
            ref={ref}
            {...props}
        >
            {props.children}
        </button>
    );
});

Button.displayName = 'button';

export default Button;
