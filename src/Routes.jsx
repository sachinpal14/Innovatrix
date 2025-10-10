import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./pages/NotFound.jsx";
import AnalyticsReporting from './pages/analytics-reporting/index.jsx';
import AppointmentManagement from './pages/appointment-management/index.jsx/';
import UnifiedDashboard from './pages/unified-dashboard/index.jsx';
import HealthRecordsVault from './pages/health-records-vault/index.jsx';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<UnifiedDashboard />} />
        <Route path="/analytics-reporting" element={<AnalyticsReporting />} />
        <Route path="/appointment-management" element={<AppointmentManagement />} />
        <Route path="/unified-dashboard" element={<UnifiedDashboard />} />
        <Route path="/health-records-vault" element={<HealthRecordsVault />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
