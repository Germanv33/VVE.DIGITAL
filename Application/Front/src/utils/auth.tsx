import { useLocation, Navigate } from "react-router-dom";
import React, { FC } from "react";

export const setToken = (token: string) => {
  localStorage.setItem("temitope", token); // make up your own token
};

export const fetchToken = (token: string = "") => {
  return localStorage.getItem("temitope");
};

interface Props {
  // any props that come into the component
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
