import classes from "./LoginForm.module.scss"
import {News} from "./News/News"
import {Login} from "./Login/Login"
import {HTMLAttributes} from "react"

export const LoginForm = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`${classes.container} ${props.className}`}>
            <Login className={classes.login}/>
            <News className={classes.news}/>
        </div>
    );
}