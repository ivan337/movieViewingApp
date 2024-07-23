import { HTMLAttributes } from 'react';

import classes from './LoginPage.module.scss';

import Login from '@/components/Login';
import News from '@/components/News';

const LoginPage = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <Login className={classes.login} />
      <News className={classes.news} />
    </div>
  );
};

export default LoginPage;
