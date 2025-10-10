import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedType, 
  onTypeChange, 
  selectedProvider, 
  onProviderChange,
  dateRange,
  onDateRangeChange,
  onClearFilters 
}) => {
  const recordTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'lab-report', label: 'Lab Reports' },
    { value: 'imaging', label: 'Medical Imaging' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'visit-notes', label: 'Visit Notes' },
    { value: 'vaccination', label: 'Vaccinations' },
    { value: 'wearable', label: 'Wearable Data' },
    { value: 'document', label: 'Documents' }
  ];

  const providers = [
    { value: 'all', label: 'All Providers' },
    { value: 'city-general', label: 'City General Hospital' },
    { value: 'wellness-clinic', label: 'Wellness Medical Clinic' },
    { value: 'cardio-center', label: 'Heart & Cardio Center' },
    { value: 'lab-corp', label: 'LabCorp Diagnostics' },
    { value: 'imaging-plus', label: 'Advanced Imaging Plus' },
    { value: 'family-care', label: 'Family Care Practice' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const hasActiveFilters = selectedType !== 'all' || selectedProvider !== 'all' || dateRange !== 'all' || searchQuery?.trim();

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 healthcare-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Search" size={20} className="mr-2" />
          Search & Filter Records
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search records, diagnoses, medications..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Record Type Filter */}
        <Select
          placeholder="Record Type"
          options={recordTypes}
          value={selectedType}
          onChange={onTypeChange}
        />

        {/* Provider Filter */}
        <Select
          placeholder="Healthcare Provider"
          options={providers}
          value={selectedProvider}
          onChange={onProviderChange}
        />

        {/* Date Range Filter */}
        <div className="lg:col-span-2">
          <Select
            placeholder="Date Range"
            options={dateRanges}
            value={dateRange}
            onChange={onDateRangeChange}
          />
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
          >
            Advanced Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Results
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-text-secondary">Active filters:</span>
            
            {searchQuery?.trim() && (
              <span className="inline-flex items-center px-3 py-1 bg-brand-primary text-white text-sm rounded-full">
                Search: "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}

            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 bg-secondary text-white text-sm rounded-full">
                Type: {recordTypes?.find(t => t?.value === selectedType)?.label}
                <button
                  onClick={() => onTypeChange('all')}
                  className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}

            {selectedProvider !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 bg-success text-white text-sm rounded-full">
                Provider: {providers?.find(p => p?.value === selectedProvider)?.label}
                <button
                  onClick={() => onProviderChange('all')}
                  className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}

            {dateRange !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 bg-warning text-white text-sm rounded-full">
                Date: {dateRanges?.find(d => d?.value === dateRange)?.label}
                <button
                  onClick={() => onDateRangeChange('all')}
                  className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;