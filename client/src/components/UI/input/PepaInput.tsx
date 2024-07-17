import { forwardRef, InputHTMLAttributes } from 'react';

import classes from './PepaInput.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export type Ref = HTMLInputElement;

export const PepaInput = forwardRef<Ref, Props>((props, ref) => (
  <input className={classes.input} {...props} ref={ref} />
));
