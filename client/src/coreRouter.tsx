import { lazy } from 'react';

import { createBrowserRouter, redirect } from 'react-router';

import { checkAuth } from '@/features/auth/authApi';
import RootLayout from '@/layouts/RootLayout';

const LoginPage = lazy(() => import('@/pages/Login/LoginPage'));
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

const protectedRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
];

const protectedLoader = async ({
    request,
}: {
    request: Request;
}): Promise<Response> => {
    try {
        const isProtected = protectedRoutes.some(
            (route) => route.path === new URL(request.url).pathname,
        );

        if (isProtected) {
            await checkAuth();
        }

        return null;
    } catch (e) {
        return redirect('/login');
    }
};

const coreRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <NotFoundPage />,
            loader: protectedLoader,
            children: [
                ...protectedRoutes,
                {
                    path: '/login',
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
