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
import Admin from "./pages/Admin";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminAnnouncementForm from "./pages/AdminAnnouncementForm";
import Login from "./pages/Login";
import AdminUserRegister from "./pages/AdminUserRegister";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Contact from "./pages/Contact";
import JobPostings from "./pages/admin/JobPostings";
import JobPostingForm from "./pages/admin/JobPostingForm";
import Benefits from "./pages/admin/Benefits";
import BenefitForm from "./pages/admin/BenefitForm";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/mirai" component={Mirai} />
      <Route path="/hikari" component={Hikari} />
      <Route path="/studio-m" component={StudioM} />
      <Route path="/careers" component={Careers} />
      <Route path="/announcements/:id" component={AnnouncementDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/announcements" component={AdminAnnouncements} />
      <Route path="/admin/announcements/new" component={AdminAnnouncementForm} />
      <Route path="/admin/announcements/:id/edit" component={AdminAnnouncementForm} />
      <Route path="/admin/job-postings" component={JobPostings} />
      <Route path="/admin/job-postings/new" component={JobPostingForm} />
      <Route path="/admin/job-postings/:id" component={JobPostingForm} />
      <Route path="/admin/benefits" component={Benefits} />
      <Route path="/admin/benefits/new" component={BenefitForm} />
      <Route path="/admin/benefits/:id" component={BenefitForm} />
      <Route path="/admin/users/register" component={AdminUserRegister} />
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
