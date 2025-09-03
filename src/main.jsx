import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { router } from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

const helmetContext = {};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider context={helmetContext}>
        <RouterProvider router={router} />
         <Toaster position="top-center" reverseOrder={false} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
