import { axiosPrivate } from "../../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // This listens to every axiosPrivate request and attaches token to it
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // This function kind of works like a listener. It listens to every request made with axiosPrivate and checks its response
    const responseItercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Catching errors that were returned by any request made with axiosPrivate
        const prevRequest = error?.config;
        // Checking if the error.status was 403 -> forbidden and if the `sent` property is not set to true, that is checked to make sure that we are trying to refresh out token just once
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // Setting `sent` property to true to indicate that hook already tried to issue a new token
          prevRequest.sent = true;
          // Issuing a new refresh token
          const newAccessToken = await refresh();
          // Setting auth header for the failed request with newly issued access token and retrying the request
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Cleaning up to not pile up all requests interceptors
    return () => {
      axiosPrivate.interceptors.response.eject(responseItercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
