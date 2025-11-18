import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCalendar = ({ selectedDate, onDateSelect, appointments = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const getAppointmentCount = (date) => {
    if (!date) return 0;
    return appointments?.filter(apt => 
      new Date(apt.date)?.toDateString() === date?.toDateString()
    )?.length;
  };

  const hasAvailableSlots = (date) => {
    if (!date) return false;
    const count = getAppointmentCount(date);
    return count < 8; // Assuming max 8 slots per day
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg border border-slate-200 healthcare-shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <Button
          variant="ghost"
          onClick={() => navigateMonth(-1)}
          className="p-2"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <h3 className="text-lg font-semibold text-text-primary">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        
        <Button
          variant="ghost"
          onClick={() => navigateMonth(1)}
          className="p-2"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      {/* Day Names */}
      <div className="grid grid-cols-7 border-b border-slate-200">
        {dayNames?.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-text-secondary bg-muted">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days?.map((date, index) => (
          <div
            key={index}
            className={`min-h-[65px] p-2 border-r border-b border-slate-100 cursor-pointer healthcare-transition ${
              date ? 'hover:bg-muted' : ''
            } ${
              isSelected(date) ? 'bg-primary/10 border-primary' : ''
            }`}
            onClick={() => date && onDateSelect(date)}
          >
            {date && (
              <div className="h-full flex flex-col">
                <div className={`text-sm font-medium mb-1 ${
                  isToday(date) 
                    ? 'text-primary font-bold' 
                    : isSelected(date)
                    ? 'text-primary' :'text-text-primary'
                }`}>
                  {date?.getDate()}
                </div>
                
                {getAppointmentCount(date) > 0 && (
                  <div className="flex-1 flex flex-col justify-end">
                    <div className={`text-xs px-1 py-0.5 rounded text-center ${
                      hasAvailableSlots(date)
                        ? 'bg-success/20 text-success' :'bg-warning/20 text-warning'
                    }`}>
                      {getAppointmentCount(date)} apt{getAppointmentCount(date) !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
                
                {date > new Date() && hasAvailableSlots(date) && (
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="w-2 h-2 bg-success rounded-full mx-auto"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-slate-200 bg-muted/30">
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-text-secondary">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-text-secondary">Limited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-text-secondary">Fully Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;