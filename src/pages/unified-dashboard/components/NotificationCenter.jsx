import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ userRole, notifications }) => {
  const [activeTab, setActiveTab] = useState('all');

  const getNotificationsForRole = () => {
    const roleNotifications = {
      patient: [
        { id: 1, type: 'appointment', title: 'Appointment Reminder', message: 'Your cardiology appointment is tomorrow at 10:30 AM', time: '2 hours ago', priority: 'high', read: false },
        { id: 2, type: 'result', title: 'Lab Results Ready', message: 'Your blood work results are available for review', time: '5 hours ago', priority: 'medium', read: false },
        { id: 3, type: 'prescription', title: 'Prescription Refill', message: 'Your Lisinopril prescription is ready for pickup', time: '1 day ago', priority: 'low', read: true },
        { id: 4, type: 'health', title: 'Health Tip', message: 'Remember to take your daily vitamins', time: '2 days ago', priority: 'low', read: true }
      ],
      doctor: [
        { id: 1, type: 'patient', title: 'New Patient Alert', message: 'Emergency patient assigned to your care', time: '15 minutes ago', priority: 'urgent', read: false },
        { id: 2, type: 'schedule', title: 'Schedule Change', message: 'Patient rescheduled for 2:00 PM today', time: '1 hour ago', priority: 'medium', read: false },
        { id: 3, type: 'system', title: 'Lab Results Available', message: 'Patient #1247 lab results are ready', time: '3 hours ago', priority: 'medium', read: true },
        { id: 4, type: 'inventory', title: 'Medication Alert', message: 'Low stock: Amoxicillin 500mg', time: '6 hours ago', priority: 'high', read: true }
      ],
      admin: [
        { id: 1, type: 'capacity', title: 'Bed Capacity Alert', message: 'ICU at 90% capacity - consider transfers', time: '30 minutes ago', priority: 'urgent', read: false },
        { id: 2, type: 'staff', title: 'Staff Shortage', message: 'Night shift needs 2 additional nurses', time: '2 hours ago', priority: 'high', read: false },
        { id: 3, type: 'inventory', title: 'Supply Order', message: 'Purchase order #PO-156 requires approval', time: '4 hours ago', priority: 'medium', read: true },
        { id: 4, type: 'compliance', title: 'Compliance Report', message: 'Monthly audit report is ready', time: '1 day ago', priority: 'low', read: true }
      ],
      government: [
        { id: 1, type: 'outbreak', title: 'Disease Outbreak Alert', message: 'Flu cases increased 25% in Metro region', time: '1 hour ago', priority: 'urgent', read: false },
        { id: 2, type: 'resource', title: 'Resource Request', message: 'Regional Hospital requests additional ventilators', time: '3 hours ago', priority: 'high', read: false },
        { id: 3, type: 'policy', title: 'Policy Update', message: 'New vaccination guidelines published', time: '1 day ago', priority: 'medium', read: true },
        { id: 4, type: 'facility', title: 'Facility Inspection', message: 'Community Health Center inspection completed', time: '2 days ago', priority: 'low', read: true }
      ]
    };
    
    return notifications || roleNotifications?.[userRole] || roleNotifications?.patient;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'text-destructive bg-red-50 border-red-200',
      high: 'text-warning bg-amber-50 border-amber-200',
      medium: 'text-brand-primary bg-blue-50 border-blue-200',
      low: 'text-text-secondary bg-slate-50 border-slate-200'
    };
    return colors?.[priority] || colors?.low;
  };

  const getTypeIcon = (type) => {
    const icons = {
      appointment: 'Calendar',
      result: 'FileText',
      prescription: 'Pill',
      health: 'Heart',
      patient: 'User',
      schedule: 'Clock',
      system: 'Settings',
      inventory: 'Package',
      capacity: 'Bed',
      staff: 'Users',
      compliance: 'Shield',
      outbreak: 'AlertTriangle',
      resource: 'Truck',
      policy: 'FileText',
      facility: 'Building'
    };
    return icons?.[type] || 'Bell';
  };

  const filteredNotifications = getNotificationsForRole()?.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification?.read;
    if (activeTab === 'urgent') return notification?.priority === 'urgent' || notification?.priority === 'high';
    return true;
  });

  const unreadCount = getNotificationsForRole()?.filter(n => !n?.read)?.length;
  const urgentCount = getNotificationsForRole()?.filter(n => n?.priority === 'urgent' || n?.priority === 'high')?.length;

  return (
    <div className="bg-white p-4  rounded-xl border border-slate-200 healthcare-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-destructive text-white text-xs font-medium rounded-full">
              {unreadCount}
            </span>
          )}
          <Button variant="ghost" iconName="Settings" iconSize={16} className="p-2" />
        </div>
      </div>
      {/* Notification Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md healthcare-transition ${
            activeTab === 'all' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md healthcare-transition relative ${
            activeTab === 'unread' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('urgent')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md healthcare-transition relative ${
            activeTab === 'urgent' ?'bg-white text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Priority
          {urgentCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-pulse-slow"></span>
          )}
        </button>
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`p-4 rounded-lg border healthcare-transition hover:shadow-sm ${
              notification?.read ? 'bg-white' : 'bg-blue-50/50'
            } ${getPriorityColor(notification?.priority)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name={getTypeIcon(notification?.type)} size={16} className="text-text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {notification?.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">{notification?.time}</span>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{notification?.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredNotifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No notifications to display</p>
        </div>
      )}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <Button variant="outline" className="w-full" iconName="Archive" iconPosition="left">
          Mark All as Read
        </Button>
      </div>
    </div>
  );
};

export default NotificationCenter;