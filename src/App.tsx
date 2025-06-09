
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import ProviderPortal from "./pages/ProviderPortal";
import PayerInterface from "./pages/PayerInterface";
import PatientView from "./pages/PatientView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/provider" element={<ProviderPortal />} />
          <Route path="/payer" element={<PayerInterface />} />
          <Route path="/patient" element={<PatientView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
