import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: JSX.Element;
  roles?: Array<'client' | 'freelancer'>;
};

export function ProtectedRoute({ children, roles }: Props) {
  const { isLoading, isAuthenticated, role } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (roles && role && !roles.includes(role)) return <Navigate to={role === 'client' ? '/client-dashboard' : '/freelancer-dashboard'} replace />;
  return children;
}


