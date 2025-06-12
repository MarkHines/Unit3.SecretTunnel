import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <App />
    </AuthProvider>
);
