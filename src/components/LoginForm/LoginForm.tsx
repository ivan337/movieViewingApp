import classes from "./LoginForm.module.css";
import {News} from "./News/News";
import {Login} from "./Login/LoginForm";

export const LoginForm = () => {
    return (
        <div className={classes.container}>
            <Login className={classes.login}/>
            <News className={classes.news}/>
        </div>
    );
}