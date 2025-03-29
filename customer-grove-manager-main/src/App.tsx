
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import InventoryPage from "./pages/InventoryPage";
import PromotionsPage from "./pages/PromotionsPage";
import InvoicesPage from "./pages/InvoicesPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import ServicesPage from "./pages/ServicesPage";
import StoresPage from "./pages/StoresPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

// Create auth context
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  userEmail: string;
  userRole: string;
  login: (email: string, role: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  userEmail: "",
  userRole: "",
  login: () => {},
  logout: () => {},
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  
  // Check if user is already logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      const { email, role } = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserRole(role);
    }
  }, []);
  
  // Login function
  const login = (email: string, role: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role);
    localStorage.setItem("auth", JSON.stringify({ email, role }));
  };
  
  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setUserRole("");
    localStorage.removeItem("auth");
  };
  
  // Auth context value
  const authContextValue = {
    isAuthenticated,
    userEmail,
    userRole,
    login,
    logout,
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authContextValue}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public route */}
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={login} />
              } />
              
              {/* Protected routes */}
              <Route element={
                isAuthenticated ? <MainLayout /> : <Navigate to="/login" />
              }>
                <Route path="/" element={<Index />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/deliveries" element={<DeliveriesPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/stores" element={<StoresPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
