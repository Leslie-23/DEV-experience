import React from "react";
import ReactDOM from "react-dom/client";
// Using createBrowserRouter eliminates the need for BrowserRouter
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store"; // No redux just yet
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./components/GlobalLoader";
import App from "./App";
import "./index.css"; // Import global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <LoadingProvider>
      <GlobalLoader />
      <App />
    </LoadingProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
