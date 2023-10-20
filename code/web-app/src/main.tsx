/*  main.ts  */

import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/index";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { message } from "antd";

import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from 'dotenv';

// dotenv.config();

message.config({
  duration: 2,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain = {process.env.AUTH0_DOMAIN!}
    clientId = {process.env.AUTH0_CLIENT_ID!}
    authorizationParams={{
      redirect_uri: window.location.origin + '/login'
    }}
  >
  <Provider store={store}>
    <App />
  </Provider>
  </Auth0Provider>

);
