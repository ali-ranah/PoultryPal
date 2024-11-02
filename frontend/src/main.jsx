import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index.css";
import { store } from "./redux/index";
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = '916953586165-mflf9vl7fco280tt791u9n20im4n3l1u.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={clientId}>
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
