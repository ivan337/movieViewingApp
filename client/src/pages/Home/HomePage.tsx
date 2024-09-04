import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useLoadProfileMutation } from '@/services/auth';

const HomePage = () => {
  const navigate = useNavigate();
  const [loadProfileQuery] = useLoadProfileMutation();

  useEffect(() => {
    loadProfileQuery()
      .then((resp) => {
        if (!resp.data.isActivated) {
          navigate('/login');
        }
      })
      .catch((error) => {
        navigate('/login');

        console.error('Error loading profile:', error);
      });
  }, []);

  return (
    <div>
      <div>Home</div>
      <Link to="login">login! </Link>
      <Link to="logut">logout! </Link>
    </div>
  );
};

export default HomePage;
