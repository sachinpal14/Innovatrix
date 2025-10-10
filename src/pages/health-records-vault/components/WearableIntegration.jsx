import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WearableIntegration = ({ wearableData, onSyncDevice, onViewDetails }) => {
  const devices = [
    {
      id: 'apple-watch',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      status: 'connected',
      lastSync: '2025-10-08T14:30:00Z',
      batteryLevel: 78,
      metrics: ['Heart Rate', 'Steps', 'Sleep', 'Workouts']
    },
    {
      id: 'fitbit-sense',
      name: 'Fitbit Sense 2',
      type: 'fitness-tracker',
      status: 'connected',
      lastSync: '2025-10-08T13:45:00Z',
      batteryLevel: 45,
      metrics: ['Activity', 'Sleep Quality', 'Stress', 'SpO2']
    },
    {
      id: 'glucose-monitor',
      name: 'Dexcom G7 CGM',
      type: 'medical-device',
      status: 'connected',
      lastSync: '2025-10-08T15:55:00Z',
      batteryLevel: 92,
      metrics: ['Blood Glucose', 'Trends', 'Alerts']
    },
    {
      id: 'blood-pressure',
      name: 'Omron HeartGuide',
      type: 'medical-device',
      status: 'disconnected',
      lastSync: '2025-10-07T09:20:00Z',
      batteryLevel: 0,
      metrics: ['Blood Pressure', 'Heart Rate']
    }
  ];

  const getDeviceIcon = (type) => {
    const iconMap = {
      'smartwatch': 'Watch',
      'fitness-tracker': 'Activity',
      'medical-device': 'Stethoscope'
    };
    return iconMap?.[type] || 'Smartphone';
  };

  const getStatusColor = (status) => {
    return status === 'connected' ? 'text-success' : 'text-destructive';
  };

  const getStatusBg = (status) => {
    return status === 'connected' ? 'bg-success/10' : 'bg-destructive/10';
  };

  const formatLastSync = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const recentMetrics = [
    {
      id: 1,
      device: 'Apple Watch Series 9',
      metric: 'Heart Rate',
      value: '72 bpm',
      timestamp: '2025-10-08T15:45:00Z',
      trend: 'stable',
      icon: 'Heart'
    },
    {
      id: 2,
      device: 'Dexcom G7 CGM',
      metric: 'Blood Glucose',
      value: '95 mg/dL',
      timestamp: '2025-10-08T15:55:00Z',
      trend: 'up',
      icon: 'Droplet'
    },
    {
      id: 3,
      device: 'Fitbit Sense 2',
      metric: 'Sleep Quality',
      value: '8.2/10',
      timestamp: '2025-10-08T07:30:00Z',
      trend: 'up',
      icon: 'Moon'
    },
    {
      id: 4,
      device: 'Apple Watch Series 9',
      metric: 'Daily Steps',
      value: '8,547',
      timestamp: '2025-10-08T15:45:00Z',
      trend: 'up',
      icon: 'Footprints'
    }
  ];

  const getTrendIcon = (trend) => {
    const trendMap = {
      'up': 'TrendingUp',
      'down': 'TrendingDown',
      'stable': 'Minus'
    };
    return trendMap?.[trend] || 'Minus';
  };

  const getTrendColor = (trend) => {
    const colorMap = {
      'up': 'text-success',
      'down': 'text-destructive',
      'stable': 'text-text-secondary'
    };
    return colorMap?.[trend] || 'text-text-secondary';
  };

  return (
    <div className="space-y-6">
      {/* Connected Devices */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 healthcare-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Smartphone" size={20} className="mr-2" />
            Connected Devices
          </h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Device
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices?.map((device) => (
            <div key={device?.id} className="border border-slate-200 rounded-lg p-4 hover:healthcare-shadow-lg healthcare-transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getDeviceIcon(device?.type)} size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{device?.name}</h4>
                    <p className="text-sm text-text-secondary capitalize">{device?.type?.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(device?.status)} ${getStatusColor(device?.status)}`}>
                  {device?.status}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Last Sync:</span>
                  <span className="text-text-primary">{formatLastSync(device?.lastSync)}</span>
                </div>
                
                {device?.status === 'connected' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Battery:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            device?.batteryLevel > 50 ? 'bg-success' :
                            device?.batteryLevel > 20 ? 'bg-warning' : 'bg-destructive'
                          }`}
                          style={{ width: `${device?.batteryLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-text-primary">{device?.batteryLevel}%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-xs text-text-secondary mb-2">Tracked Metrics:</p>
                <div className="flex flex-wrap gap-1">
                  {device?.metrics?.map((metric) => (
                    <span key={metric} className="px-2 py-1 bg-slate-100 text-xs text-text-secondary rounded">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {device?.status === 'connected' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                    onClick={() => onSyncDevice(device?.id)}
                  >
                    Sync Now
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Wifi"
                    iconPosition="left"
                  >
                    Reconnect
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Settings
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Metrics */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 healthcare-shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Activity" size={20} className="mr-2" />
            Recent Metrics
          </h3>
          <Button
            variant="outline"
            size="sm"
            iconName="BarChart3"
            iconPosition="left"
            onClick={onViewDetails}
          >
            View Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentMetrics?.map((metric) => (
            <div key={metric?.id} className="border border-slate-200 rounded-lg p-4 hover:healthcare-shadow-lg healthcare-transition">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={metric?.icon} size={16} className="text-brand-primary" />
                </div>
                <Icon 
                  name={getTrendIcon(metric?.trend)} 
                  size={16} 
                  className={getTrendColor(metric?.trend)} 
                />
              </div>
              
              <div className="mb-2">
                <h4 className="font-semibold text-text-primary text-lg">{metric?.value}</h4>
                <p className="text-sm text-text-secondary">{metric?.metric}</p>
              </div>
              
              <div className="text-xs text-text-secondary">
                <p className="truncate">{metric?.device}</p>
                <p>{formatLastSync(metric?.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WearableIntegration;