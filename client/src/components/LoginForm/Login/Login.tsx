import {PepaInput} from "../../UI/input/PepaInput"
import classes from './Login.module.scss'
import {PepaButton} from "../../UI/button/PepaButton"
import {FormEventHandler, InputHTMLAttributes, useCallback, useRef, useState} from "react"
import {FaLock, FaUser} from "react-icons/fa"
import axios from 'axios'

export const Login = (props: InputHTMLAttributes<HTMLDivElement>) => {
    let login = useRef<HTMLInputElement>(null)
    let password = useRef<HTMLInputElement>(null)
    let [error, setError] = useState('')

    const onFormSubmit = useCallback(function(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/login', {
                login: login.current.value,
                password: password.current.value
            })
            .then(w => console.warn(w))
            .catch(({request, response}) => {
                setError(response.data.message)
            });
    }, [login, password])

    return (
        <>
        <div className={`${classes.login} ${props.className}`}>
            <div className={classes.login__header}>
                <div className={classes.login_headerImage}/>
            </div>
            <div className={classes.login__main}>
                <div className={classes.navigator}>

                </div>
                <form onSubmit={onFormSubmit} className={classes.inputForm} >
                    <div className={classes.inputBox}>
                        <PepaInput
                            className={classes.inputBox_inputText}
                            required={true}
                            ref={login} type={"text"}
                            placeholder={"Логин"}
                        />
                        <FaUser className={classes.inputBox_icon}/>
                    </div>

                    <div className={classes.inputBox}>
                        <PepaInput
                            className={classes.inputBox_inputText}
                            required={true}
                            ref={password}
                            type={"password"}
                            placeholder={"Пароль"}
                        />
                        <FaLock className={classes.inputBox_icon}/>
                    </div>

                    <div className={classes.inputForm__checkbox}>
                        <PepaInput
                            className={classes.inputForm__checkbox_checkboxInput}
                            type={"checkbox"}
                        />
                        <label className={classes.inputForm__checkbox_checkboxLabel}>Запомнить логин</label>
                    </div>
                    <div className={classes.inputForm__loginButtonR}>
                        <PepaButton
                            className={classes.inputForm__loginButton}
                            type={'submit'}
                        >Войти</PepaButton>
                    </div>
                    {error && error}
                </form>
            </div>
        </div>
        </>
    )
}