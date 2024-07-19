import './App.scss';
import { RouterProvider } from 'react-router-dom';

import coreRouter from '@/routes';

function App() {
  return (
    <div className="App">
      <RouterProvider router={coreRouter} />
    </div>
  );
}

export default App;
