import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AppointmentList = ({ appointments, onReschedule, onCancel, onJoinCall }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/20 text-success';
      case 'pending': return 'bg-warning/20 text-warning';
      case 'cancelled': return 'bg-destructive/20 text-destructive';
      case 'completed': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Video';
      case 'phone': return 'Phone';
      case 'in-person': return 'User';
      default: return 'Calendar';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime > new Date();
  };

  const canJoinCall = (date, time, type) => {
    if (type !== 'video' && type !== 'phone') return false;
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const timeDiff = appointmentDateTime?.getTime() - now?.getTime();
    return timeDiff <= 15 * 60 * 1000 && timeDiff >= -30 * 60 * 1000; // 15 min before to 30 min after
  };

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">

      {appointments?.length === 0 ? (
        <div className="bg-white w-full rounded-lg border border-slate-200 healthcare-shadow p-8 text-center">
          <div className="w-full  bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Appointments Found</h3>
          <p className="text-text-secondary mb-4">You don't have any appointments scheduled yet.</p>
          <Button variant="default">
            <Icon name="Plus" size={16} />
            <span className="ml-2">Book Your First Appointment</span>
          </Button>
        </div>
      ) : (
        appointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className="bg-white rounded-lg max-h-[100%] border border-slate-200 healthcare-shadow hover:healthcare-shadow-lg healthcare-transition"
          >
            <div className="p-6">
              {/* Appointment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={appointment?.provider?.avatar}
                      alt={appointment?.provider?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {appointment?.provider?.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{appointment?.provider?.specialty}</p>
                    <p className="text-xs text-text-secondary mt-1">{appointment?.reason}</p>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                  {appointment?.status?.charAt(0)?.toUpperCase() + appointment?.status?.slice(1)}
                </span>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Icon name="Calendar" size={18} className="text-primary" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {formatDate(appointment?.date)}
                    </div>
                    <div className="text-xs text-text-secondary">Date</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Icon name="Clock" size={18} className="text-secondary" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {formatTime(appointment?.time)}
                    </div>
                    <div className="text-xs text-text-secondary">Time</div>
                  </div>
                </div>
                
              
              </div>

              {/* Location/Link Info */}
              {appointment?.type === 'in-person' && (
                <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg mb-4">
                  <Icon name="MapPin" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">{appointment?.location}</span>
                </div>
              )}

              {/* Preparation Instructions */}
              {/* {appointment?.instructions && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-900 mb-1">Preparation Instructions</div>
                      <div className="text-sm text-blue-800">{appointment?.instructions}</div>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
               
                {isUpcoming(appointment?.date, appointment?.time) && appointment?.status !== 'cancelled' && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => onReschedule(appointment?.id)}
                    >
                      <Icon name="Calendar" size={16} />
                      <span className="ml-2">Reschedule</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => onCancel(appointment?.id)}
                      className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                    >
                      <Icon name="X" size={16} />
                      <span className="ml-2">Cancel</span>
                    </Button>
                  </>
                )}
                
                <Button variant="ghost">
                  <Icon name="MessageSquare" size={16} />
                  <span className="ml-2">Message Provider</span>
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentList;