import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Emergency Department Capacity Alert',
      message: 'ED at 95% capacity. Consider diverting non-critical cases.',
      timestamp: new Date(Date.now() - 300000),
      department: 'Emergency',
      acknowledged: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Medication Inventory Low',
      message: 'Insulin supplies below minimum threshold in Pharmacy.',
      timestamp: new Date(Date.now() - 900000),
      department: 'Pharmacy',
      acknowledged: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Disease Surveillance Update',
      message: 'Flu cases increased by 15% in the past week.',
      timestamp: new Date(Date.now() - 1800000),
      department: 'Public Health',
      acknowledged: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Staff Shortage Alert',
      message: 'ICU nursing staff 20% below optimal levels for night shift.',
      timestamp: new Date(Date.now() - 3600000),
      department: 'ICU',
      acknowledged: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Quality Metric Achievement',
      message: 'Patient satisfaction scores exceeded target by 8%.',
      timestamp: new Date(Date.now() - 7200000),
      department: 'Quality',
      acknowledged: true
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      case 'success': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-slate-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const unacknowledgedAlerts = alerts?.filter(alert => !alert?.acknowledged);

  return (
    <div className="bg-white rounded-lg border border-slate-200 healthcare-shadow">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-text-primary">System Alerts</h3>
            {unacknowledgedAlerts?.length > 0 && (
              <span className="px-2 py-1 bg-destructive text-white text-xs font-medium rounded-full">
                {unacknowledgedAlerts?.length} New
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" iconName="Settings" iconPosition="left">
              Configure
            </Button>
            <Button variant="outline" iconName="Bell" iconPosition="left">
              Mark All Read
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No alerts at this time</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {alerts?.map((alert) => (
              <div
                key={alert?.id}
                className={`p-4 border-l-4 ${getAlertColor(alert?.type)} ${
                  alert?.acknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon 
                      name={getAlertIcon(alert?.type)} 
                      size={20} 
                      className={alert?.type === 'critical' ? 'text-destructive' : 
                                alert?.type === 'warning' ? 'text-warning' :
                                alert?.type === 'success' ? 'text-success' : 'text-primary'}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-text-primary">{alert?.title}</h4>
                        <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded">
                          {alert?.department}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{alert?.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">
                          {formatTimestamp(alert?.timestamp)}
                        </span>
                        {!alert?.acknowledged && (
                          <Button variant="ghost" className="text-xs p-1">
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" className="p-1 ml-2">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-slate-200 bg-muted">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Last updated: {new Date()?.toLocaleTimeString()}
          </span>
          <Button variant="ghost" iconName="RefreshCw" className="text-xs">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;