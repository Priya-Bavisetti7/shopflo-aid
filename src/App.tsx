import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserLogin from "./pages/UserLogin";
import StoreLogin from "./pages/StoreLogin";
import InfoPage from "./pages/InfoPage";
import HomePage from "./pages/HomePage";
import Navigation from "./pages/Navigation";
import StockUpdates from "./pages/StockUpdates";
import SelfBilling from "./pages/SelfBilling";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/store-login" element={<StoreLogin />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/stock" element={<StockUpdates />} />
          <Route path="/billing" element={<SelfBilling />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
