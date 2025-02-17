import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import coreRouter from '@/coreRouter';
import { ThemeProvider } from '@/provider/ThemeProvider';
import store from '@/store/store';

const darkTheme = {};
const lightTheme = {};

const RootProvider: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider darkTheme={darkTheme} lightTheme={lightTheme}>
                <RouterProvider router={coreRouter} />
            </ThemeProvider>
        </Provider>
    );
};

export default RootProvider;
