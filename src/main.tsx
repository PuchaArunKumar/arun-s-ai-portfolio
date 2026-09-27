import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Fonts are self-hosted so page views are not reported to a third party.
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/geist/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
