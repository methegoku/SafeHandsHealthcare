import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFoundPage from "@/pages/404";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Providers from "@/pages/Providers";
import ProviderProfilePage from "@/pages/providers/[id]";
import RajeshPatelProfile from "@/pages/providers/rajesh-patel";
import PriyaSharmaProfile from "@/pages/providers/priya-sharma";
import AnitaReddyProfile from "@/pages/providers/anita-reddy";
import Booking from "@/pages/Booking";
import Dashboard from "@/pages/Dashboard";
import AdminPanel from "@/pages/AdminPanel";

// Import Home Care pages
import HomeCarePage from "@/pages/home-care";
import ServiceDetailPage from "@/pages/home-care/[id]";
import BookingConfirmationPage from "@/pages/home-care/booking-confirmation";

// Import other service pages
import MedicalServicesPage from "@/pages/medical-services";
import ChildCarePage from "@/pages/child-care";

// Import company pages
import AboutPage from "@/pages/about";
import HowItWorksPage from "@/pages/how-it-works";
import SafetyPage from "@/pages/safety";
import BecomeProviderPage from "@/pages/become-provider";

// Import support pages
import ContactPage from "@/pages/contact";
import HelpPage from "@/pages/help";

// Create a client
const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      
      {/* Service Routes */}
      <Route path="/home-care" component={HomeCarePage} />
      <Route path="/home-care/:id" component={ServiceDetailPage} />
      <Route path="/home-care/booking-confirmation" component={BookingConfirmationPage} />
      <Route path="/medical-services" component={MedicalServicesPage} />
      <Route path="/child-care" component={ChildCarePage} />
      
      {/* Company Routes */}
      <Route path="/about" component={AboutPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/safety" component={SafetyPage} />
      <Route path="/become-provider" component={BecomeProviderPage} />
      
      {/* Support Routes */}
      <Route path="/contact" component={ContactPage} />
      <Route path="/help" component={HelpPage} />
      
      {/* Provider Routes */}
      <Route path="/providers" component={Providers} />
      <Route path="/providers/:id" component={ProviderProfilePage} />
      <Route path="/providers/rajesh-patel" component={RajeshPatelProfile} />
      <Route path="/providers/priya-sharma" component={PriyaSharmaProfile} />
      <Route path="/providers/anita-reddy" component={AnitaReddyProfile} />
      
      {/* Other Routes */}
      <Route path="/booking" component={Booking} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={AdminPanel} />
      
      {/* 404 Route - Must be last */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
