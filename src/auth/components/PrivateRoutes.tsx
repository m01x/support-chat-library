import { Navigate } from "react-router";

interface Props {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

export const PrivateRoutes = ({isAuthenticated, children}: Props) => {

    if(!isAuthenticated) {
        return <Navigate to="/auth" />
    }
    
  return children;
}
