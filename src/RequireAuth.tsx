import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useTypeSelector } from './store/store'

interface Props {
  children: any
};

export const RequireAuth:FC<Props> = ({ children }) => {
  const user = useTypeSelector(state => state.user)
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
