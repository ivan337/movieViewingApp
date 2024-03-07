import classes from "./LoginForm.module.css";
import {News} from "./News/News";
import {Login} from "./Login/LoginForm";
import {HTMLAttributes} from "react";

export const LoginForm = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`${classes.container} ${props.className}`}>
            <News className={classes.news}/>
            <Login className={classes.login}/>
        </div>
    );
}