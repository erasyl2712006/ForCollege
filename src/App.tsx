import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Dashboard from "./pages/Dashboard";
import GradesPage from "./pages/GradesPage";
import Schedule from "./pages/Schedule";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grades"
          element={
            <ProtectedRoute>
              <GradesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
  );
};

export default App;
