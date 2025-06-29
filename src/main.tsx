import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import { LanguageProvider } from "@/context/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
