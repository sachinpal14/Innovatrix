import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsGrid = ({ userRole, stats }) => {
  const getStatsForRole = () => {
    const roleStats = {
      patient: [
        { label: 'Upcoming Appointments', value: stats?.upcomingAppointments || '3', icon: 'Calendar', color: 'text-brand-primary', bgColor: 'bg-blue-50' },
        { label: 'Pending Results', value: stats?.pendingResults || '2', icon: 'FileText', color: 'text-secondary', bgColor: 'bg-teal-50' },
        { label: 'Prescriptions Due', value: stats?.prescriptionsDue || '1', icon: 'Pill', color: 'text-warning', bgColor: 'bg-amber-50' },
        { label: 'Health Score', value: stats?.healthScore || '85%', icon: 'Activity', color: 'text-success', bgColor: 'bg-emerald-50' }
      ],
      doctor: [
        { label: 'Today\'s Patients', value: stats?.todaysPatients || '12', icon: 'Users', color: 'text-brand-primary', bgColor: 'bg-blue-50' },
        { label: 'Pending Reviews', value: stats?.pendingReviews || '8', icon: 'ClipboardList', color: 'text-warning', bgColor: 'bg-amber-50' },
        // { label: 'Teleconsultations', value: stats?.teleconsultations || '5', icon: 'Video', color: 'text-secondary', bgColor: 'bg-teal-50' },
        { label: 'Patient Satisfaction', value: stats?.satisfaction || '4.8', icon: 'Star', color: 'text-success', bgColor: 'bg-emerald-50' }
      ],
      admin: [
        { label: 'Bed Occupancy', value: stats?.bedOccupancy || '78%', icon: 'Bed', color: 'text-brand-primary', bgColor: 'bg-blue-50' },
        { label: 'Staff on Duty', value: stats?.staffOnDuty || '145', icon: 'UserCheck', color: 'text-success', bgColor: 'bg-emerald-50' },
        { label: 'Inventory Alerts', value: stats?.inventoryAlerts || '6', icon: 'AlertTriangle', color: 'text-destructive', bgColor: 'bg-red-50' },
        { label: 'Revenue Today', value: stats?.revenueToday || '$24.5K', icon: 'DollarSign', color: 'text-secondary', bgColor: 'bg-teal-50' }
      ],
      government: [
        { label: 'Active Facilities', value: stats?.activeFacilities || '127', icon: 'Building', color: 'text-brand-primary', bgColor: 'bg-blue-50' },
        { label: 'Disease Alerts', value: stats?.diseaseAlerts || '3', icon: 'AlertCircle', color: 'text-destructive', bgColor: 'bg-red-50' },
        { label: 'Resource Utilization', value: stats?.resourceUtilization || '82%', icon: 'BarChart3', color: 'text-success', bgColor: 'bg-emerald-50' },
        { label: 'Policy Compliance', value: stats?.policyCompliance || '94%', icon: 'Shield', color: 'text-secondary', bgColor: 'bg-teal-50' }
      ]
    };
    
    return roleStats?.[userRole] || roleStats?.patient;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {getStatsForRole()?.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 healthcare-shadow hover:healthcare-shadow-lg healthcare-transition">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} strokeWidth={2} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-text-primary">{stat?.value}</div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary mb-1">{stat?.label}</h3>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stat?.color?.replace('text-', 'bg-')}`}
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                ></div>
              </div>
              <span className="text-xs text-success font-medium">+{Math.floor(Math.random() * 15 + 5)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsGrid;