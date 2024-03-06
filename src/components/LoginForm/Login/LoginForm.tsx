import {PepaInput} from "../../UI/input/PepaInput";
import classes from './Login.module.css'
import {PepaButton} from "../../UI/button/PepaButton";
import {InputHTMLAttributes, LegacyRef, useCallback, useRef} from "react";

export const Login = (props: InputHTMLAttributes<HTMLDivElement>) => {
    let login = useRef<HTMLInputElement>(null);
    let password = useRef<HTMLInputElement>(null);

    const doLogin = function() {
        return;
    };

    return (
        <div className={classes.login} {...props}>
            <div className={classes.login__header}>
                <div className={classes.login_headerImage}/>
            </div>
            <div className={classes.login__main}>
                <div className={classes.navigator}>

                </div>
                <div className={classes.inputForm}>
                    <PepaInput className={classes.inputForm_inputText}  ref={login} type={"text"} placeholder={"Логин"}/>
                    <PepaInput className={classes.inputForm_inputText} ref={password} type={"password"} placeholder={"Пароль"}/>
                    <div className={classes.inputForm__checkbox}>
                        <PepaInput className={classes.inputForm__checkbox_checkboxInput} type={"checkbox"}/>
                        <label className={classes.inputForm__checkbox_checkboxLabel}>Запомнить логин</label>
                    </div>
                    <div className={classes.inputForm__rightSideButton}>
                        <PepaButton type={'button'} onClick={doLogin}>Войти</PepaButton>
                    </div>
                </div>
            </div>
        </div>
    );
}