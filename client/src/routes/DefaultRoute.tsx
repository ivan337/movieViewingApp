import { Navigate } from 'react-router-dom';

const DefaultRoute = {
  path: '/',
  element: <Navigate to="/home" />, // Перенаправление на /home по умолчанию
};

export default DefaultRoute;
