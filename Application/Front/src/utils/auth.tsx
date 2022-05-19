import { useLocation, Navigate, RouteProps } from "react-router-dom";
import React, { FC } from "react";
import axios from "axios";

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

// export const token_check = () => {
//   axios
//     .post("http://localhost:8081/api/v1/auth/token", "token=" + userStore.token)
//     .then(function (response) {
//       console.log(response.data.token);
//       if (response.status === 200) {
//         console.log(" Successful Check");
//         if (response.data.access_token.access_token) {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     })
//     .catch(function (error) {
//       console.log(error, "error");
//     });
// };

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
