import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
const { VITE_CLERK_PUBLISHABLE_KEY } = import.meta.env;
const publishableKey = VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorBackground: "#0a0f0d", // Deep black-green background
          colorText: "#d4ffb6", // Soft neon green text for contrast
          borderRadius: "12px", // Slightly larger radius for a modern feel
        },
        elements: {
          card: {
            backgroundColor: "rgba(10, 15, 13, 0.9)", // Deep black-green with slight transparency
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(0, 255, 128, 0.1)", // Subtle green glow
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 255, 128, 0.2)", // Faint green border for elegance
          },
          input: {
            backgroundColor: "#0e1914", // Dark greenish black for seamless blending
            border: "1px solid rgba(0, 255, 128, 0.3)", // Subtle green outline
            color: "#d4ffb6", // Soft neon green for readability
          },
          button: {
            // backgroundColor: "rgba(0, 128, 64, 0.8)", // Rich dark green
            color: "#ffffff", // White text for contrast
            border: "1px solid rgba(0, 255, 128, 0.4)", // Green outline
            transition: "all 0.3s ease-in-out",
          },
          buttonHover: {
            // backgroundColor: "#fff", // Slightly brighter green on hover
            // boxShadow: "0 0 10px rgba(0, 255, 128, 0.5)", // Green glow effect
          },
          footer: {
            backgroundColor: "rgba(0, 64, 32, 0.8)", // Dark muted green
            color: "#a3e4b0", // Soft green text
          },
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
