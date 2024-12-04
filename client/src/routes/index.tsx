import { createBrowserRouter } from 'react-router-dom';

import DefaultRoute from '@/routes/DefaultRoute';
import HomeRoute from '@/routes/HomeRoute';
import LoginRoute from '@/routes/LoginRoute';

const coreRouter = createBrowserRouter([DefaultRoute, HomeRoute, LoginRoute]);

export default coreRouter;
