import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";

import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";

const Client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <QueryClientProvider client={Client}>
      <ChakraProvider>
        <BrowserRouter>
          <ReactQueryDevtools />
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
