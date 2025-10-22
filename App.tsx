import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HomeDesign2 from "./pages/HomeDesign2";
import HomeDesign3 from "./pages/HomeDesign3";
import About from "./pages/About";
import Mirai from "./pages/Mirai";
import Hikari from "./pages/Hikari";
import StudioM from "./pages/StudioM";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Recruit from "./pages/Recruit";
import AdminCMS from "./pages/AdminCMS";
import PasswordLogin from "./pages/PasswordLogin";
import Contact from "./pages/Contact";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/design2"} component={HomeDesign2} />
      <Route path={"/design3"} component={HomeDesign3} />
      <Route path={"/about"} component={About} />
      <Route path={"/mirai"} component={Mirai} />
      <Route path="/hikari" component={Hikari} />
      <Route path="/studio-m" component={StudioM} />
      <Route path="/admin/announcements" component={AdminAnnouncements} />
      <Route path="/admin/cms" component={AdminCMS} />
      <Route path="/admin/login" component={PasswordLogin} />
      <Route path="/announcements/:id" component={AnnouncementDetail} />
      <Route path="/recruit" component={Recruit} />
      <Route path="/contact" component={Contact} />
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
