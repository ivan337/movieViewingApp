import classes from './PepaInput.module.css'
import {forwardRef, InputHTMLAttributes, ReactNode} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {};

export type Ref = HTMLInputElement;

export const PepaInput = forwardRef<Ref, Props> (
    (props, ref) =>
        (
            <input className={classes.input} {...props} ref={ref}/>
        )
)