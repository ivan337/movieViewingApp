import { ButtonHTMLAttributes, forwardRef } from 'react';

import classes from './PepaButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export type Ref = HTMLButtonElement;

const PepaButton = forwardRef<Ref, Props>((props, ref) => {
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

PepaButton.displayName = 'Pepe button';

export default PepaButton;
