import { lazy } from 'react';

import { createBrowserRouter } from 'react-router';

import RootLayout from '@/layouts/RootLayout';

const LoginPage = lazy(() => import('@/pages/Login/LoginPage'));
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

const coreRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: '/home',
                    element: <HomePage />,
                },
                {
                    path: 'login',
                    element: <LoginPage />,
                },
                {
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ],
    {
        basename: '',
    },
);

export default coreRouter;
