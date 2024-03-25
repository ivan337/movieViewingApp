import {PepaInput} from "../../UI/input/PepaInput"
import classes from './Login.module.scss'
import {PepaButton} from "../../UI/button/PepaButton"
import {InputHTMLAttributes, useRef} from "react"
import {FaLock, FaUser} from "react-icons/fa"

export const Login = (props: InputHTMLAttributes<HTMLDivElement>) => {
    let login = useRef<HTMLInputElement>(null)
    let password = useRef<HTMLInputElement>(null)

    const doLogin = function() {
        return
    }

    return (
        <div className={`${classes.login} ${props.className}`}>
            <div className={classes.login__header}>
                <div className={classes.login_headerImage}/>
            </div>
            <div className={classes.login__main}>
                <div className={classes.navigator}>

                </div>
                <div className={classes.inputForm}>
                    <div className={classes.inputBox}>
                        <PepaInput className={classes.inputBox_inputText}  ref={login} type={"text"} placeholder={"Логин"}/>
                        <FaUser className={classes.inputBox_icon}/>
                    </div>

                    <div className={classes.inputBox}>
                        <PepaInput className={classes.inputBox_inputText} ref={password} type={"password"} placeholder={"Пароль"}/>
                        <FaLock className={classes.inputBox_icon}/>
                    </div>

                    <div className={classes.inputForm__checkbox}>
                        <PepaInput className={classes.inputForm__checkbox_checkboxInput} type={"checkbox"}/>
                        <label className={classes.inputForm__checkbox_checkboxLabel}>Запомнить логин</label>
                    </div>
                    <div className={classes.inputForm__loginButtonR}>
                        <PepaButton className={classes.inputForm__loginButton} type={'button'} onClick={doLogin}>Войти</PepaButton>
                    </div>
                </div>
            </div>
        </div>
    )
}