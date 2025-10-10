import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSchedule = ({ userRole, scheduleItems }) => {
  const getScheduleForRole = () => {
    const roleSchedules = {
      patient: [
        { id: 1, title: 'Cardiology Consultation', time: '10:30 AM', date: 'Today', doctor: 'Dr. Sarah Chen', type: 'appointment', status: 'confirmed', location: 'Room 205' },
        { id: 2, title: 'Lab Work Follow-up', time: '2:00 PM', date: 'Tomorrow', doctor: 'Dr. Michael Rodriguez', type: 'lab', status: 'pending', location: 'Lab Wing' }
      ],
      doctor: [
        { id: 1, title: 'John Martinez - Hypertension', time: '9:00 AM', date: 'Today', patient: 'John Martinez', type: 'consultation', status: 'confirmed', room: 'Room 301' },
        { id: 2, title: 'Maria Rodriguez - Teleconsult', time: '11:30 AM', date: 'Today', patient: 'Maria Rodriguez', type: 'teleconsult', status: 'scheduled', room: 'Virtual' },
        { id: 3, title: 'Emergency Surgery Prep', time: '3:00 PM', date: 'Today', patient: 'Emergency Patient', type: 'surgery', status: 'urgent', room: 'OR 2' }
      ],
      admin: [
        { id: 1, title: 'Staff Meeting - ICU', time: '8:00 AM', date: 'Today', department: 'ICU', type: 'meeting', status: 'scheduled', attendees: '12 staff' },
        { id: 2, title: 'Inventory Review', time: '1:00 PM', date: 'Today', department: 'Pharmacy', type: 'review', status: 'pending', attendees: '5 staff' }
      ],
      government: [
        { id: 1, title: 'Regional Health Review', time: '10:00 AM', date: 'Today', region: 'Metro District', type: 'review', status: 'scheduled', facilities: '15 hospitals' },
        { id: 2, title: 'Policy Implementation Call', time: '3:30 PM', date: 'Today', region: 'State Level', type: 'policy', status: 'confirmed', facilities: '127 facilities' }
      ]
    };
    
    return scheduleItems || roleSchedules?.[userRole] || roleSchedules?.patient;
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'text-success bg-emerald-50',
      pending: 'text-warning bg-amber-50',
      scheduled: 'text-brand-primary bg-blue-50',
      urgent: 'text-destructive bg-red-50'
    };
    return colors?.[status] || 'text-text-secondary bg-slate-50';
  };

  const getTypeIcon = (type) => {
    const icons = {
      appointment: 'Calendar',
      lab: 'TestTube',
      consultation: 'Stethoscope',
      teleconsult: 'Video',
      surgery: 'Scissors',
      meeting: 'Users',
      review: 'ClipboardList',
      policy: 'FileText'
    };
    return icons?.[type] || 'Clock';
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 healthcare-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">
          {userRole === 'patient' && 'Upcoming Appointments'}
          {userRole === 'doctor' && 'Today\'s Schedule'}
          {userRole === 'admin' && 'Scheduled Tasks'}
          {userRole === 'government' && 'Scheduled Reviews'}
        </h2>
        <Button variant="ghost" iconName="Plus" iconSize={16}>
          Add New
        </Button>
      </div>
      <div className="space-y-4">
        {getScheduleForRole()?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 healthcare-transition">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(item?.type)} size={20} color="white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-primary truncate">{item?.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                  {item?.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{item?.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{item?.date}</span>
                </div>
                {item?.location && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{item?.location}</span>
                  </div>
                )}
                {item?.room && (
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{item?.room}</span>
                  </div>
                )}
              </div>
              
              {(item?.doctor || item?.patient || item?.department || item?.region) && (
                <div className="mt-2 text-sm text-text-secondary">
                  {item?.doctor && `with ${item?.doctor}`}
                  {item?.patient && `Patient: ${item?.patient}`}
                  {item?.department && `Department: ${item?.department}`}
                  {item?.region && `Region: ${item?.region}`}
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0">
              <Button variant="ghost" iconName="ChevronRight" iconSize={16} className="p-2" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <Button variant="outline" className="w-full" iconName="Calendar" iconPosition="left">
          View Full Schedule
        </Button>
      </div>
    </div>
  );
};

export default UpcomingSchedule;