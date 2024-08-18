import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { InventoryList, CreateProduct } from '@/pages/Inventory';
import Layout from './components/Layout/Layout';
import AuthWrapper from "@/components/Auth/AuthWrapper";
import { UserRole } from '@/types/user';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: UserRole[] }> = ({ children, allowedRoles }) => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    console.log('ProtectedRoute: No user detected, should navigate to login');
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(user!.role)) {
    console.log('ProtectedRoute: User role not allowed, should navigate to home');
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

function App() {
  return (

    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          {/* <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMINISTRADOR, UserRole.VENDEDOR]}>
                <Layout><Inventory /></Layout>
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMINISTRADOR, UserRole.VENDEDOR]}>
                <Layout><InventoryList /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory/create"
            element={
              <ProtectedRoute allowedRoles={[UserRole.ADMINISTRADOR, UserRole.VENDEDOR]}>
                <Layout><CreateProduct /></Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;


