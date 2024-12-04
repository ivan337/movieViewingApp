import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <div>Home</div>
      <Link to="/login">login! </Link>
      <Link to="/logout">logout! </Link>
    </div>
  );
};

export default HomePage;
