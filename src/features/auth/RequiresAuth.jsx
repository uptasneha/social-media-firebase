import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequiresAuth = () => {
  const location = useLocation();
  const { userData } = useSelector(state => state.auth);

  return userData ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
