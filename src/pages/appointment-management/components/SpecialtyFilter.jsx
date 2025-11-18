import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SpecialtyFilter = ({ selectedSpecialty, onSpecialtyChange, selectedLocation, onLocationChange }) => {
  const specialties = [
    { id: 'all', name: 'All Specialties', icon: 'Stethoscope', count: 45 },
    { id: 'cardiology', name: 'Cardiology', icon: 'Heart', count: 8 },
    { id: 'dermatology', name: 'Dermatology', icon: 'Scan', count: 6 },
    { id: 'neurology', name: 'Neurology', icon: 'Brain', count: 5 },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'Bone', count: 7 },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby', count: 9 },
    { id: 'psychiatry', name: 'Psychiatry', icon: 'Users', count: 4 },
    { id: 'radiology', name: 'Radiology', icon: 'ScanLine', count: 3 },
    { id: 'surgery', name: 'Surgery', icon: 'Scissors', count: 6 }
  ];

  const locations = [
    { id: 'all', name: 'All Locations', address: 'Multiple facilities' },
    { id: 'main', name: 'Main Hospital', address: '123 Medical Center Dr' },
    { id: 'north', name: 'North Campus', address: '456 Healthcare Blvd' },
    { id: 'south', name: 'South Clinic', address: '789 Wellness Ave' },
    { id: 'downtown', name: 'Downtown Center', address: '321 City Medical St' }
  ];

  return (
    <div className="space-y-6">
      {/* Specialty Filter */}
      {/* <div className="bg-white rounded-lg border border-slate-200 healthcare-shadow">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <span>Medical Specialties</span>
          </h3>
          <p className="text-sm text-text-secondary mt-1">Select a specialty to view available providers</p>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {specialties?.map((specialty) => (
              <Button
                key={specialty?.id}
                variant={selectedSpecialty === specialty?.id ? "default" : "outline"}
                onClick={() => onSpecialtyChange(specialty?.id)}
                className="justify-start h-auto p-4 text-left"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    selectedSpecialty === specialty?.id 
                      ? 'bg-white/20' :'bg-primary/10'
                  }`}>
                    <Icon 
                      name={specialty?.icon} 
                      size={20} 
                      className={selectedSpecialty === specialty?.id ? 'text-white' : 'text-primary'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{specialty?.name}</div>
                    <div className={`text-xs ${
                      selectedSpecialty === specialty?.id ? 'text-white/80' : 'text-text-secondary'
                    }`}>
                      {specialty?.count} providers
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div> */}
      {/* Location Filter */}
      <div className="bg-white rounded-lg border border-slate-200 healthcare-shadow">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="MapPin" size={20} className="text-secondary" />
            <span>Facility Locations</span>
          </h3>
          <p className="text-sm text-text-secondary mt-1">Choose your preferred healthcare facility</p>
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            {locations?.map((location) => (
              <Button
                key={location?.id}
                variant={selectedLocation === location?.id ? "default" : "ghost"}
                onClick={() => onLocationChange(location?.id)}
                className="w-full justify-start h-auto p-4 text-left"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    selectedLocation === location?.id 
                      ? 'bg-white/20' :'bg-secondary/10'
                  }`}>
                    <Icon 
                      name="Building2" 
                      size={18} 
                      className={selectedLocation === location?.id ? 'text-white' : 'text-secondary'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{location?.name}</div>
                    <div className={`text-xs truncate ${
                      selectedLocation === location?.id ? 'text-white/80' : 'text-text-secondary'
                    }`}>
                      {location?.address}
                    </div>
                  </div>
                  {selectedLocation === location?.id && (
                    <Icon name="Check" size={16} className="text-white flex-shrink-0" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Filters */}
      {/* <div className="bg-white rounded-lg border border-slate-200 healthcare-shadow">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-text-primary">Quick Filters</h3>
        </div>
        
        <div className="p-4 space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="ml-2">Available Today</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Calendar" size={16} className="text-success" />
            <span className="ml-2">This Week</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Star" size={16} className="text-brand-primary" />
            <span className="ml-2">Top Rated</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Shield" size={16} className="text-secondary" />
            <span className="ml-2">Insurance Accepted</span>
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default SpecialtyFilter;