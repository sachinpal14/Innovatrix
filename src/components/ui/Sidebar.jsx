import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);
  const location = useLocation();

  const navigationItems = [
    {
      category: 'Core Workflows',
      items: [
        { name: 'Unified Dashboard', path: '/unified-dashboard', icon: 'LayoutDashboard', description: 'Overview & insights' },
        { name: 'Appointments', path: '/appointment-management', icon: 'Calendar', description: 'Schedule & manage' },
        { name: 'Health Records', path: '/health-records-vault', icon: 'FileText', description: 'Patient data vault' },
        { name: 'Teleconsultation', path: '/teleconsultation-suite', icon: 'Video', description: 'Virtual care sessions' },
      ]
    },
    {
      category: 'Analytics & Care',
      items: [
        { name: 'Analytics', path: '/analytics-reporting', icon: 'BarChart3', description: 'Reports & metrics' },
        { name: 'Patient Care', path: '/patient-care-ecosystem', icon: 'Users', description: 'Care coordination' },
      ]
    }
  ];

  const quickActions = [
    { name: 'Emergency Alert', icon: 'AlertTriangle', color: 'text-destructive' },
    { name: 'Quick Consult', icon: 'Stethoscope', color: 'text-brand-primary' },
    { name: 'Patient Search', icon: 'Search', color: 'text-secondary' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) onToggle(!isExpanded);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-slate-200 healthcare-shadow healthcare-transition ${
        isExpanded ? 'w-72' : 'w-16'
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            {isExpanded && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-medium text-text-secondary">Healthcare Portal</span>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={handleToggle}
              className="p-2 hover:bg-muted"
            >
              <Icon name={isExpanded ? "ChevronLeft" : "ChevronRight"} size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigationItems?.map((section) => (
              <div key={section?.category}>
                {isExpanded && (
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                    {section?.category}
                  </h3>
                )}
                <div className="space-y-1">
                  {section?.items?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium healthcare-transition group ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                      title={!isExpanded ? item?.name : ''}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`flex-shrink-0 ${
                          isActivePath(item?.path) ? 'text-white' : 'text-text-secondary group-hover:text-text-primary'
                        }`}
                      />
                      {isExpanded && (
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item?.name}</div>
                          <div className={`text-xs truncate ${
                            isActivePath(item?.path) ? 'text-white/80' : 'text-text-secondary'
                          }`}>
                            {item?.description}
                          </div>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-slate-200">
            {isExpanded && (
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
            )}
            <div className="space-y-2">
              {quickActions?.map((action) => (
                <Button
                  key={action?.name}
                  variant="ghost"
                  className={`w-full justify-start px-3 py-2.5 text-sm font-medium ${action?.color} hover:bg-muted`}
                  title={!isExpanded ? action?.name : ''}
                >
                  <Icon name={action?.icon} size={18} className="flex-shrink-0" />
                  {isExpanded && <span className="ml-3 truncate">{action?.name}</span>}
                </Button>
              ))}
            </div>
          </div>

          {/* User Status */}
          <div className="p-4 border-t border-slate-200">
            <div className={`flex items-center space-x-3 ${!isExpanded && 'justify-center'}`}>
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-secondary to-success rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-white rounded-full"></div>
              </div>
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary truncate">Dr. Sarah Chen</div>
                  <div className="text-xs text-text-secondary truncate">Online • Cardiology</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default Sidebar;