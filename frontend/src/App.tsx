import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { Home, Login, AdminDashboard, SellerView } from "@/pages";
import { InventoryList, CreateProduct } from '@/pages/Inventory';
import { AuthWrapper, LayoutWrapper } from "@/components";
import { UserRole } from '@/types/user';

function App() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/vendedor" element={<LayoutWrapper><SellerView /></LayoutWrapper>} />
          <Route
            path="/inventory"
            element={
              user && user.role === UserRole.VENDEDOR
                ? <LayoutWrapper><InventoryList /></LayoutWrapper>
                : <Navigate to="/vendedor" />
            }
          />
          <Route
            path="/inventory/create"
            element={
              user && user.role === UserRole.VENDEDOR
                ? <LayoutWrapper><CreateProduct /></LayoutWrapper>
                : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin"
            element={
              user && user.role === UserRole.ADMINISTRADOR
                ? <LayoutWrapper><AdminDashboard /></LayoutWrapper>
                : <Navigate to="/" />
            }
          />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;