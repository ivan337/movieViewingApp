import { forwardRef, InputHTMLAttributes } from 'react';

import classes from './PepaInput.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

type Ref = HTMLInputElement;

const PepaInput = forwardRef<Ref, Props>((props, ref) => (
  <input className={classes.input} {...props} ref={ref} />
));

PepaInput.displayName = 'Pepe Input field';

export default PepaInput;
export { Ref };
