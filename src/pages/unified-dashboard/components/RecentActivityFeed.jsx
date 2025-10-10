import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ userRole, activities }) => {
  const getActivitiesForRole = () => {
    const roleActivities = {
      patient: [
        { id: 1, type: 'appointment', title: 'Appointment Confirmed', description: 'Cardiology consultation with Dr. Sarah Chen', time: '2 hours ago', icon: 'Calendar', color: 'text-success' },
        { id: 2, type: 'result', title: 'Lab Results Available', description: 'Blood work results are ready for review', time: '5 hours ago', icon: 'FileText', color: 'text-brand-primary' },
        { id: 3, type: 'prescription', title: 'Prescription Refill', description: 'Lisinopril prescription has been refilled', time: '1 day ago', icon: 'Pill', color: 'text-secondary' },
        { id: 4, type: 'reminder', title: 'Health Reminder', description: 'Time for your daily medication', time: '2 days ago', icon: 'Bell', color: 'text-warning' }
      ],
      doctor: [
        { id: 1, type: 'patient', title: 'New Patient Assigned', description: 'John Martinez - Hypertension follow-up', time: '30 minutes ago', icon: 'UserPlus', color: 'text-success' },
        { id: 2, type: 'consultation', title: 'Teleconsultation Completed', description: 'Video call with Maria Rodriguez', time: '2 hours ago', icon: 'Video', color: 'text-brand-primary' },
        { id: 3, type: 'prescription', title: 'E-Prescription Sent', description: 'Medication prescribed for patient #1247', time: '4 hours ago', icon: 'Pill', color: 'text-secondary' },
        { id: 4, type: 'alert', title: 'Inventory Alert', description: 'Low stock: Amoxicillin 500mg', time: '6 hours ago', icon: 'AlertTriangle', color: 'text-destructive' }
      ],
      admin: [
        { id: 1, type: 'staff', title: 'Staff Schedule Updated', description: 'Night shift coverage for ICU ward', time: '1 hour ago', icon: 'UserCheck', color: 'text-success' },
        { id: 2, type: 'inventory', title: 'Purchase Order Approved', description: 'Medical supplies order #PO-2024-156', time: '3 hours ago', icon: 'Package', color: 'text-brand-primary' },
        { id: 3, type: 'compliance', title: 'Compliance Report Generated', description: 'Monthly HIPAA audit completed', time: '5 hours ago', icon: 'Shield', color: 'text-secondary' },
        { id: 4, type: 'capacity', title: 'Bed Capacity Alert', description: 'Emergency ward at 85% capacity', time: '8 hours ago', icon: 'Bed', color: 'text-warning' }
      ],
      government: [
        { id: 1, type: 'surveillance', title: 'Disease Trend Alert', description: 'Flu cases increased by 15% in Region 3', time: '2 hours ago', icon: 'TrendingUp', color: 'text-destructive' },
        { id: 2, type: 'resource', title: 'Resource Allocation Updated', description: 'Additional ventilators deployed to Metro Hospital', time: '4 hours ago', icon: 'Truck', color: 'text-success' },
        { id: 3, type: 'policy', title: 'Policy Impact Analysis', description: 'Vaccination program effectiveness report', time: '1 day ago', icon: 'FileBarChart', color: 'text-brand-primary' },
        { id: 4, type: 'facility', title: 'New Facility Registered', description: 'Community Health Center - Downtown', time: '2 days ago', icon: 'Building', color: 'text-secondary' }
      ]
    };
    
    return activities || roleActivities?.[userRole] || roleActivities?.patient;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 healthcare-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
          <span className="text-sm text-text-secondary">Live Updates</span>
        </div>
      </div>
      <div className="space-y-4">
        {getActivitiesForRole()?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted healthcare-transition">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Icon name={activity?.icon} size={18} className={activity?.color} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-text-primary truncate">{activity?.title}</h3>
                <span className="text-xs text-text-secondary flex-shrink-0 ml-2">{activity?.time}</span>
              </div>
              <p className="text-sm text-text-secondary">{activity?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        <button className="w-full text-sm text-brand-primary hover:text-brand-primary/80 font-medium healthcare-transition">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;