import React, { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';

import './index.scss';
//import { Provider } from 'react-redux'
//import store from './store/store'

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);

//<Provider store={store}>
//<App />
//</Provider>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
