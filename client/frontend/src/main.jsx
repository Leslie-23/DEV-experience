import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const { VITE_CLERK_PUBLISHABLE_KEY } =
  import.meta.env ||
  "pk_test_YWRhcHRlZC1jcmF3ZGFkLTUyLmNsZXJrLmFjY291bnRzLmRldiQ";
const publishableKey =
  VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_YWRhcHRlZC1jcmF3ZGFkLTUyLmNsZXJrLmFjY291bnRzLmRldiQ";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorBackground: "#f0f0f0", // Background color
          colorText: "#fff", // Default text color
          borderRadius: "10px", // Border radius for buttons and inputs
        },
        elements: {
          card: {
            backgroundColor: "rgba(96, 96, 96, 0.14)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(30px)",
          },
          input: {
            backgroundColor: "#fff",
            border: "none",
          },
          button: {
            backgroundColor: "rgba(197, 197, 197, 0.08)",
            color: "#fff",
            border: "none",
          },
          footer: {
            backgroundColor: "rgba(192, 192, 192, 0.08)",
            color: "#000",
          },
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
