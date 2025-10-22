import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Mirai from "./pages/Mirai";
import Hikari from "./pages/Hikari";
import StudioM from "./pages/StudioM";
import Careers from "./pages/Careers";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/mirai" component={Mirai} />
      <Route path="/hikari" component={Hikari} />
      <Route path="/studio-m" component={StudioM} />
      <Route path="/careers" component={Careers} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
