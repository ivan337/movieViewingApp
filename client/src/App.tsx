import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import coreRouter from '@/routes';
import store from '@/store/store';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <RouterProvider router={coreRouter} />
            </Provider>
        </div>
    );
}

export default App;
