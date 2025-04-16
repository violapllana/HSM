import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Fshij token dhe role nga localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Ridrejto te login
    navigate('/');
  }, [navigate]);

  return null; // ose mund të kthesh një mesazh si "Logging out..."
}

export default Logout;
