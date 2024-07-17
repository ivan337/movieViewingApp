import { HTMLAttributes } from 'react';

import { Login } from './Login/Login';
import classes from './LoginForm.module.scss';
import { News } from './News/News';

export const LoginForm = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <Login className={classes.login} />
      <News className={classes.news} />
    </div>
  );
};
