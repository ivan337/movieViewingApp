import { InputHTMLAttributes, useCallback, useState } from 'react';

import { FaLock, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Login.module.scss';

import PepaButton from '@/components/UI/button/PepaButton';
import PepaInput from '@/components/UI/input/PepaInput';
import { selectAuthError, setError, setToken } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/services/auth';
import { appendCookie } from '@/utils/cookie';

const Login = (props: InputHTMLAttributes<HTMLDivElement>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const loginMutation = useLoginMutation();

  const onFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const resp = await loginMutation.mutateAsync({ email, password });

        if (resp.accessToken && resp.refreshToken) {
          dispatch(
            setToken({
              accessToken: resp.accessToken,
              isAuthenticated: true,
              error: '',
            }),
          );

          appendCookie('refreshToken', resp.refreshToken, 14, true);

          sessionStorage.setItem('accessToken', resp.accessToken);
        }
      } catch (e) {
        if (e.response && 'data' in e.response) {
          dispatch(setError(e.response.data.message));
        } else {
          dispatch(setError(e.message));
        }
      }
    },
    [email, password],
  );

  return (
    <div className={`${classes.login} ${props.className}`}>
      <div className={classes.login__header}>
        <div className={classes.login_headerImage} />
      </div>
      <div className={classes.login__main}>
        <div className={classes.navigator}></div>
        <form onSubmit={onFormSubmit} className={classes.inputForm}>
          <div className={classes.inputBox}>
            <PepaInput
              className={classes.inputBox_inputText}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              type={'text'}
              placeholder={'Логин'}
            />
            <FaUser className={classes.inputBox_icon} />
          </div>

          <div className={classes.inputBox}>
            <PepaInput
              className={classes.inputBox_inputText}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
              placeholder={'Пароль'}
            />
            <FaLock className={classes.inputBox_icon} />
          </div>

          <div className={classes.inputForm__checkbox}>
            <PepaInput
              className={classes.inputForm__checkbox_checkboxInput}
              type={'checkbox'}
            />
            <label className={classes.inputForm__checkbox_checkboxLabel}>
              Запомнить логин
            </label>
          </div>
          <div className={classes.inputForm__loginButtonR}>
            <PepaButton
              className={classes.inputForm__loginButton}
              type={'submit'}
            >
              Войти
            </PepaButton>
          </div>
          {error && error}
        </form>
      </div>
    </div>
  );
};

export default Login;
