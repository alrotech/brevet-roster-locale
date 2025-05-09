
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import Brevets from "./pages/Brevets";
import Permanents from "./pages/Permanents";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import RoutesPage from "./pages/RoutesPage";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import EventResults from "./pages/EventResults";
import ParticipantProfile from "./pages/ParticipantProfile";
import Statistics from "./pages/Statistics";
import Footer from "./components/Footer";

// Import i18n configuration
import './i18n/i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/brevets" element={<Brevets />} />
              <Route path="/permanents" element={<Permanents />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/clubs/:clubId" element={<ClubDetails />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/events/:eventId/results" element={<EventResults />} />
              <Route path="/participants/:participantId" element={<ParticipantProfile />} />
              <Route path="/statistics" element={<Statistics />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
