import { forwardRef, InputHTMLAttributes } from 'react';

import classes from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, Props>((props, ref) => (
    <input className={classes.input} {...props} ref={ref} />
));

Input.displayName = 'input';

export default Input;
export { Ref };
