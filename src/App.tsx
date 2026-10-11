import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Spaces from "./components/site/Spaces";
import Index from "./pages/Index";
import Abilitiverse from "./pages/Abilitiverse";
import Radar from "./pages/Radar";
import NotFound from "./pages/NotFound";

// The three pages share the Spaces layout (the page bar and swipe navigation).
// vercel.json rewrites /abilitiverse and /radar to index.html.
export const AppRoutes = () => (
  <Routes>
    <Route element={<Spaces />}>
      <Route path="/" element={<Index />} />
      <Route path="/abilitiverse" element={<Abilitiverse />} />
      <Route path="/radar" element={<Radar />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
