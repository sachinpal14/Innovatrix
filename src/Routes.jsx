import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./pages/NotFound.jsx";
import AnalyticsReporting from './pages/analytics-reporting/index.jsx';
import AppointmentManagement from './pages/appointment-management/index.jsx';
import UnifiedDashboard from './pages/unified-dashboard/index.jsx';
import HealthRecordsVault from './pages/health-records-vault/index.jsx';
import Login from "./pages/Authorization/Login.jsx";
import Signup from "./pages/Authorization/Signup.jsx";
import { useSelector } from "react-redux";
import PrivateRoute from "./pages/Authorization/PrivateRoute.jsx";
import Medicines from "./pages/medicines/index.jsx";
import SymptomsSection from "./pages/symptoms-section/index.jsx";
import About from "./pages/About/Index.jsx";




const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        

          {/* Protected Routes */}
          <Route path="/analytics-reporting" element={<PrivateRoute><AnalyticsReporting /></PrivateRoute>} />
          <Route path="/appointment-management" element={<PrivateRoute><AppointmentManagement /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><UnifiedDashboard /></PrivateRoute>} />
          <Route path="/health-records-vault" element={<PrivateRoute><HealthRecordsVault /></PrivateRoute>} />
          <Route path="/medicines" element={<PrivateRoute><Medicines/></PrivateRoute>} />
          <Route path="/symptoms-section" element={<PrivateRoute><SymptomsSection/></PrivateRoute>} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default RoutesComponent;
