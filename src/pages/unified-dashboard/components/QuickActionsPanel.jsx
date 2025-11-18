import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionsPanel = ({ userRole, onActionClick }) => {
  const getActionsForRole = () => {
    const roleActions = {
      patient: [
        { id: 'book-appointment', label: 'Book Appointment', icon: 'Calendar', variant: 'default', route: '/appointment-management' },
        { id: 'view-records', label: 'View Health Records', icon: 'FileText', variant: 'outline', route: '/health-records' },
        // { id: 'start-consultation', label: 'Start Teleconsultation', icon: 'Video', variant: 'secondary', route: '/teleconsultation-suite' },
        // { id: 'emergency', label: 'Emergency Alert', icon: 'AlertTriangle', variant: 'destructive', route: '#' }
      ],
      doctor: [
        { id: 'patient-queue', label: 'View Patient Queue', icon: 'Users', variant: 'default', route: '/patient-care-ecosystem' },
        { id: 'prescribe', label: 'E-Prescribe', icon: 'Pill', variant: 'outline', route: '/health-records-vault' },
        { id: 'teleconsult', label: 'Join Teleconsultation', icon: 'Video', variant: 'secondary', route: '/teleconsultation-suite' },
        { id: 'analytics', label: 'View Analytics', icon: 'BarChart3', variant: 'ghost', route: '/analytics-reporting' }
      ],
      admin: [
        { id: 'staff-schedule', label: 'Manage Staff', icon: 'UserCheck', variant: 'default', route: '/patient-care-ecosystem' },
        { id: 'inventory', label: 'Check Inventory', icon: 'Package', variant: 'outline', route: '/analytics-reporting' },
        { id: 'reports', label: 'Generate Reports', icon: 'FileBarChart', variant: 'secondary', route: '/analytics-reporting' },
        { id: 'compliance', label: 'Compliance Check', icon: 'Shield', variant: 'ghost', route: '/analytics-reporting' }
      ],
      government: [
        { id: 'surveillance', label: 'Disease Surveillance', icon: 'Activity', variant: 'default', route: '/analytics-reporting' },
        { id: 'resources', label: 'Resource Allocation', icon: 'Truck', variant: 'outline', route: '/patient-care-ecosystem' },
        { id: 'policy', label: 'Policy Analysis', icon: 'FileText', variant: 'secondary', route: '/analytics-reporting' },
        { id: 'emergency-coord', label: 'Emergency Coordination', icon: 'Siren', variant: 'destructive', route: '#' }
      ]
    };
    
    return roleActions?.[userRole] || roleActions?.patient;
  };

  const handleActionClick = (action) => {
    if (action?.route === '#') {
      // Handle emergency actions
      if (onActionClick) onActionClick(action);
    } else {
      window.location.href = action?.route;
    }
  };

  return (
    <div className="bg-white w-full  p-6 rounded-xl border border-slate-200 healthcare-shadow flex flex-col justify-center">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
        <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={16} color="white" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {getActionsForRole()?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            onClick={() => handleActionClick(action)}
            className="justify-start h-auto p-4 text-left"
            iconName={action?.icon}
            iconPosition="left"
            iconSize={20}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{action?.label}</span>
              <span className="text-xs opacity-70 mt-1">
                {action?.id === 'emergency' && 'Immediate assistance'}
                {action?.id === 'book-appointment' && 'Schedule with specialists'}
                {action?.id === 'view-records' && 'Access medical history'}
                {action?.id === 'start-consultation' && 'Connect with doctor'}
                {action?.id === 'patient-queue' && 'Manage appointments'}
                {action?.id === 'prescribe' && 'Digital prescriptions'}
                {action?.id === 'teleconsult' && 'Virtual consultations'}
                {action?.id === 'analytics' && 'Performance metrics'}
                {action?.id === 'staff-schedule' && 'Workforce management'}
                {action?.id === 'inventory' && 'Supply monitoring'}
                {action?.id === 'reports' && 'Operational insights'}
                {action?.id === 'compliance' && 'Regulatory adherence'}
                {action?.id === 'surveillance' && 'Public health monitoring'}
                {action?.id === 'resources' && 'Healthcare distribution'}
                {action?.id === 'policy' && 'Impact assessment'}
                {action?.id === 'emergency-coord' && 'Crisis management'}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;