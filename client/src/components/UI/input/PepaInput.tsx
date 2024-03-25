import classes from './PepaInput.module.scss'
import {forwardRef, InputHTMLAttributes} from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export type Ref = HTMLInputElement

export const PepaInput = forwardRef<Ref, Props> (
    (props, ref) =>
        (
            <input className={classes.input} {...props} ref={ref}/>
        )
)