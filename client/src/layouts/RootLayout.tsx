import './RootLayout.scss';

import React, { Suspense } from 'react';

import { Outlet } from 'react-router';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';

const RootLayout = () => {
    return (
        <div className="App">
            <Header />
            <main className="main">
                <Suspense fallback={<LoadingIndicator />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
