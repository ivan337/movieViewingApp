import classes from './PepaButton.module.css'
import {ButtonHTMLAttributes, forwardRef} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export type Ref = HTMLButtonElement;

export const PepaButton = forwardRef<Ref, Props> ((props, ref) => {
    return (
        <button className={classes.button} ref={ref} {...props}>
            {props.children}
        </button>
    )
})