import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ onFiltersChange, isCollapsed, onToggle }) => {
  const [filters, setFilters] = useState({
    dateRange: '30days',
    department: 'all',
    userType: 'all',
    reportType: 'operational'
  });

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'surgery', label: 'Surgery' },
    { value: 'radiology', label: 'Radiology' }
  ];

  const userTypeOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'patients', label: 'Patients' },
    { value: 'doctors', label: 'Doctors' },
    { value: 'nurses', label: 'Nurses' },
    { value: 'admins', label: 'Administrators' }
  ];

  const reportTypeOptions = [
    { value: 'operational', label: 'Operational Metrics' },
    { value: 'clinical', label: 'Clinical Outcomes' },
    { value: 'financial', label: 'Financial Performance' },
    { value: 'compliance', label: 'Compliance Reports' },
    { value: 'population', label: 'Population Health' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '30days',
      department: 'all',
      userType: 'all',
      reportType: 'operational'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-lg healthcare-shadow healthcare-transition ${
      isCollapsed ? 'p-4' : 'p-6'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-text-primary ${isCollapsed ? 'text-sm' : 'text-lg'}`}>
          Filters & Controls
        </h3>
        <Button
          variant="ghost"
          onClick={onToggle}
          className="p-2"
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={16} />
        </Button>
      </div>
      {!isCollapsed && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
            
            <Select
              label="Department"
              options={departmentOptions}
              value={filters?.department}
              onChange={(value) => handleFilterChange('department', value)}
            />
            
            <Select
              label="User Type"
              options={userTypeOptions}
              value={filters?.userType}
              onChange={(value) => handleFilterChange('userType', value)}
            />
            
            <Select
              label="Report Type"
              options={reportTypeOptions}
              value={filters?.reportType}
              onChange={(value) => handleFilterChange('reportType', value)}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={resetFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset Filters
            </Button>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                variant="default"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;