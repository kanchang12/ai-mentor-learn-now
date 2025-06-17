
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ContentProvider } from "./contexts/ContentContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import General from "./pages/General";
import Writing from "./pages/Writing";
import Images from "./pages/Images";
import Business from "./pages/Business";
import Data from "./pages/Data";
import Website from "./pages/Website";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ContentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/general" element={
                <ProtectedRoute>
                  <General />
                </ProtectedRoute>
              } />
              <Route path="/writing" element={
                <ProtectedRoute>
                  <Writing />
                </ProtectedRoute>
              } />
              <Route path="/images" element={
                <ProtectedRoute>
                  <Images />
                </ProtectedRoute>
              } />
              <Route path="/business" element={
                <ProtectedRoute>
                  <Business />
                </ProtectedRoute>
              } />
              <Route path="/data" element={
                <ProtectedRoute>
                  <Data />
                </ProtectedRoute>
              } />
              <Route path="/website" element={
                <ProtectedRoute>
                  <Website />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/billing" element={
                <ProtectedRoute>
                  <Billing />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ContentProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
