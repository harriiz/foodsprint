import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://foodsprint.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // allows us to get current state of app,
    // if we have token we are setting the authrosatioin header, we pass Bearer format
    // console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log("lets see");
  // args arguments we re passing to fetchbae query url and things like that,
  // api has its own api not like in prep headers, extraOptions are passed
  //  evenifwenotnsuethem
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions); // set our result, we get it from the first request
  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions); // we get new refreshResult and new api route
    // console.log(refreshResult);
    if (refreshResult?.data) {
      // data should hold the access token
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data })); //
      // console.log(refreshResult);
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions); // retry original request, try original aces if deosnt work send refresh token which gives new acces tokena nd we retry original query
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
        console.log("403");
      }

      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Restoran", "User", "Menu"],
  endpoints: (builder) => ({}),
});
