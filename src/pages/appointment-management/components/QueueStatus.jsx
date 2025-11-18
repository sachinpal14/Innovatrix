import React from 'react';
import Icon from '../../../components/AppIcon';

const QueueStatus = ({ queueData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time': return 'text-success';
      case 'delayed': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time': return 'CheckCircle';
      case 'delayed': return 'Clock';
      case 'critical': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-white w-full rounded-lg border border-slate-200 healthcare-shadow">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-primary" />
          <span>Live Queue Status</span>
        </h3>
        <p className="text-sm text-text-secondary mt-1">Real-time updates on appointment queues</p>
      </div>

      {/* Overall Status */}
      <div className="border-t border-slate-200 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <div className="text-xl font-bold text-success">
              {queueData?.reduce((sum, q) => sum + q?.completedToday, 0)}
            </div>
            <div className="text-xs text-success font-medium">Total Completed Today</div>
          </div>

          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <div className="text-xl font-bold text-warning">
              {queueData?.reduce((sum, q) => sum + q?.currentPatients, 0)}
            </div>
            <div className="text-xs text-warning font-medium">Total Currently Waiting</div>
          </div>
        </div>
      </div>
      <div className="quesGrid p-4 grid grid-cols-2 gap-3 overflow-y-scroll h-[350px]">
        {queueData?.map((queue) => (
          <div key={queue?.id} className="border border-slate-200 rounded-lg p-4">
            {/* Queue Header */}


            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Stethoscope" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{queue?.department}</h4>
                  <p className="text-sm text-text-secondary">{queue?.location}</p>
                </div>
              </div>

              <div className={`flex items-center space-x-1 ${getStatusColor(queue?.status)}`}>
                <Icon name={getStatusIcon(queue?.status)} size={16} />
                <span className="text-sm font-medium capitalize">{queue?.status?.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Queue Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-text-primary">{queue?.currentPatients}</div>
                <div className="text-xs text-text-secondary">Patients Waiting</div>
              </div>

              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-text-primary">{queue?.avgWaitTime}</div>
                <div className="text-xs text-text-secondary">Avg Wait (min)</div>
              </div>

              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-text-primary">{queue?.nextAvailable}</div>
                <div className="text-xs text-text-secondary">Next Available</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>Queue Progress</span>
                <span>{queue?.completedToday}/{queue?.totalToday} completed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full healthcare-transition"
                  style={{ width: `${(queue?.completedToday / queue?.totalToday) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Recent Updates */}
            {queue?.recentUpdate && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                <div className="flex items-center space-x-1 text-blue-800">
                  <Icon name="Info" size={12} />
                  <span className="font-medium">Update:</span>
                  <span>{queue?.recentUpdate}</span>
                </div>
              </div>
            )}
          </div>
        ))}


      </div>
    </div>
  );
};

export default QueueStatus;