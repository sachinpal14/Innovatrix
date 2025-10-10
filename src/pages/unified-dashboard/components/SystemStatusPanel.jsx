import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusPanel = ({ userRole, systemStatus }) => {
  const getSystemMetrics = () => {
    const roleMetrics = {
      patient: [
        { label: 'Portal Availability', value: '99.9%', status: 'operational', icon: 'Globe' },
        { label: 'Appointment System', value: 'Online', status: 'operational', icon: 'Calendar' },
        { label: 'Teleconsultation', value: 'Available', status: 'operational', icon: 'Video' },
        { label: 'Records Access', value: 'Secure', status: 'operational', icon: 'Shield' }
      ],
      doctor: [
        { label: 'EMR System', value: 'Online', status: 'operational', icon: 'FileText' },
        { label: 'Patient Queue', value: '12 Active', status: 'operational', icon: 'Users' },
        { label: 'Lab Integration', value: 'Connected', status: 'operational', icon: 'TestTube' },
        { label: 'Prescription System', value: 'Active', status: 'warning', icon: 'Pill' }
      ],
      admin: [
        { label: 'Hospital Network', value: '98.7%', status: 'operational', icon: 'Network' },
        { label: 'Staff Systems', value: '145 Online', status: 'operational', icon: 'UserCheck' },
        { label: 'Inventory System', value: 'Synced', status: 'operational', icon: 'Package' },
        { label: 'Backup Systems', value: 'Ready', status: 'operational', icon: 'HardDrive' }
      ],
      government: [
        { label: 'Regional Network', value: '127 Facilities', status: 'operational', icon: 'Building' },
        { label: 'Data Collection', value: 'Real-time', status: 'operational', icon: 'Database' },
        { label: 'Alert System', value: 'Active', status: 'operational', icon: 'Bell' },
        { label: 'Compliance Monitor', value: '94% Compliant', status: 'warning', icon: 'Shield' }
      ]
    };
    
    // Only use systemStatus if it's a valid array, otherwise fall back to roleMetrics
    if (Array.isArray(systemStatus) && systemStatus?.length > 0) {
      return systemStatus;
    }
    
    return roleMetrics?.[userRole] || roleMetrics?.patient || [];
  };

  const getStatusColor = (status) => {
    const colors = {
      operational: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
      maintenance: 'text-text-secondary'
    };
    return colors?.[status] || 'text-text-secondary';
  };

  const getStatusBg = (status) => {
    const colors = {
      operational: 'bg-emerald-50',
      warning: 'bg-amber-50',
      error: 'bg-red-50',
      maintenance: 'bg-slate-50'
    };
    return colors?.[status] || 'bg-slate-50';
  };

  const getStatusIndicator = (status) => {
    const indicators = {
      operational: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-destructive',
      maintenance: 'bg-text-secondary'
    };
    return indicators?.[status] || 'bg-text-secondary';
  };

  const metrics = getSystemMetrics();

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 healthcare-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">System Status</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
          <span className="text-sm text-success font-medium">All Systems Operational</span>
        </div>
      </div>
      <div className="space-y-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${getStatusBg(metric?.status)} rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={18} className={getStatusColor(metric?.status)} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary">{metric?.label}</h3>
                <p className="text-sm text-text-secondary">{metric?.value}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${getStatusIndicator(metric?.status)} rounded-full`}></div>
              <span className={`text-xs font-medium capitalize ${getStatusColor(metric?.status)}`}>
                {metric?.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last Updated:</span>
          <span className="text-text-primary font-medium">
            {new Date()?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusPanel;