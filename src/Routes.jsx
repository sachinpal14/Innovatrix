import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsReporting from './pages/analytics-reporting';
import AppointmentManagement from './pages/appointment-management';
import UnifiedDashboard from './pages/unified-dashboard';
import HealthRecordsVault from './pages/health-records-vault';

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
