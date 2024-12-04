import React, { HTMLAttributes } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import classes from './LoginPage.module.scss';

import Login from '@/components/Login';
import News from '@/components/News';

const queryClient = new QueryClient();

const LoginPage: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${classes.container} ${props.className}`}>
        <Login className={classes.login} />
        <News className={classes.news} />
      </div>
    </QueryClientProvider>
  );
};

export default LoginPage;