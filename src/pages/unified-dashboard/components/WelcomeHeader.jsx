import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userRole, userName, currentTime }) => {
  console.log("all things in the welcome header.jsx ",userRole,userName,currentTime)
  const getRoleSpecificGreeting = () => {
    const hour = new Date()?.getHours();
    const timeGreeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    
    const roleMessages = {
      patient: `${timeGreeting}, ${userName}! Ready to take charge of your health today?`,
      doctor: `${timeGreeting}, Dr. ${userName}! Your patients are counting on your expertise.`,
      admin: `${timeGreeting}, ${userName}! Let's optimize healthcare operations together.`,
      government: `${timeGreeting}, ${userName}! Monitor and improve public health outcomes.`
    };
    
    return roleMessages?.[userRole] || `${timeGreeting}, ${userName}!`;
  };

  const getRoleIcon = () => {
    const icons = {
      patient: 'Heart',
      doctor: 'Stethoscope',
      admin: 'Settings',
      government: 'Building'
    };
    return icons?.[userRole] || 'User';
  };

  const getRoleColor = () => {
    const colors = {
      patient: 'from-brand-secondary to-success',
      doctor: 'from-brand-primary to-secondary',
      admin: 'from-warning to-conversion-accent',
      government: 'from-trust-builder to-primary'
    };
    return colors?.[userRole] || 'from-primary to-secondary';
  };

  return (
    <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl border border-slate-200 healthcare-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${getRoleColor()} rounded-xl flex items-center justify-center`}>
            <Icon name={getRoleIcon()} size={28} color="white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              {getRoleSpecificGreeting()}
            </h1>
            <p className="text-text-secondary flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>{currentTime}</span>
              <span className="w-2 h-2 bg-success rounded-full animate-pulse-slow ml-2"></span>
              <span className="text-success font-medium">System Online</span>
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-text-secondary">Today's Priority</div>
            <div className="text-lg font-semibold text-text-primary">
              {userRole === 'patient' && 'Health Check-up'}
              {userRole === 'doctor' && '12 Appointments'}
              {userRole === 'admin' && 'Staff Review'}
              {userRole === 'government' && 'Policy Analysis'}
            </div>
          </div>
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} color="var(--color-primary)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;