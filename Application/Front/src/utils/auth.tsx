import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { FC } from "react";
import { get_role } from "./AxiosQueries/customerQueries";

export const setToken = (token: string | null) => {
  if (token == null) {
    localStorage.removeItem("temitope");
  } else {
    localStorage.setItem("temitope", token);
  }
};

export const fetchToken = () => {
  return localStorage.getItem("temitope");
};

interface Props {
  children: any;
}

export const RequireToken: FC<Props> = ({ children }) => {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
