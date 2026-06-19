import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/selectors";

interface RestrictedRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}

export const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: RestrictedRouteProps) => {
  const isAuth = useAppSelector<boolean>(selectAuth);
  return isAuth ? <Navigate to={redirectTo} /> : <Component />;
};
