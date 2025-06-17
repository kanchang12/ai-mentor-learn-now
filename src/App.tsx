
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import General from "./pages/General";
import Writing from "./pages/Writing";
import Images from "./pages/Images";
import Business from "./pages/Business";
import Data from "./pages/Data";
import Website from "./pages/Website";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/general" element={<ProtectedRoute><General /></ProtectedRoute>} />
            <Route path="/writing" element={<ProtectedRoute><Writing /></ProtectedRoute>} />
            <Route path="/images" element={<ProtectedRoute><Images /></ProtectedRoute>} />
            <Route path="/business" element={<ProtectedRoute><Business /></ProtectedRoute>} />
            <Route path="/data" element={<ProtectedRoute><Data /></ProtectedRoute>} />
            <Route path="/website" element={<ProtectedRoute><Website /></ProtectedRoute>} />
            <Route path="/category/:id" element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
