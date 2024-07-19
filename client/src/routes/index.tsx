import { createHashRouter } from 'react-router-dom';

import HomeRoute from '@/routes/HomeRoute';
import LoginRoute from '@/routes/LoginRoute';

const coreRouter = createHashRouter([HomeRoute, LoginRoute]);

export default coreRouter;
