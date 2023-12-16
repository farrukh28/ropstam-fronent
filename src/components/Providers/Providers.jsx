import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { sonner } from "../../configs/toaster";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

// set default routes base url
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

// add interceptors
axios.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const errorMessage = error?.response?.data?.error || "Something went wrong";
    throw new Error(errorMessage);
  }
);

// react query
const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <>
      <Toaster
        position={sonner.position}
        expand={sonner.expand}
        closeButton={sonner.closeButton}
        richColors={sonner.richColors}
        visibleToasts={sonner.visibleToasts}
        loadingIcon={<Spinner size={20} />}
        toastOptions={{
          duration: sonner.toastOptions.duration,
        }}
      />
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default Providers;
