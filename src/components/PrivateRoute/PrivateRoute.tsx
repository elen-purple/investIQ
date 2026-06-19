import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { selectAuth } from "../../redux/auth/selectors";
import type { JSX } from "react";

interface PrivateRestrictedRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: PrivateRestrictedRouteProps) => {
  const isAuth = useAppSelector(selectAuth);
  const shouldRedirect = !isAuth;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
