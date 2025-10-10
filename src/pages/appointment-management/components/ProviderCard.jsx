import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProviderCard = ({ provider, onBookAppointment, onViewProfile }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'limited': return 'text-warning';
      case 'busy': return 'text-destructive';
      default: return 'text-text-secondary';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available Today';
      case 'limited': return 'Limited Slots';
      case 'busy': return 'Fully Booked';
      default: return 'Check Schedule';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 healthcare-shadow hover:healthcare-shadow-lg healthcare-transition">
      {/* Provider Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={provider?.avatar}
                alt={provider?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              provider?.isOnline ? 'bg-success' : 'bg-slate-300'
            }`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary truncate">
              {provider?.name}
            </h3>
            <p className="text-sm text-text-secondary">{provider?.specialty}</p>
            <p className="text-xs text-text-secondary mt-1">{provider?.qualification}</p>
            
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm font-medium text-text-primary">{provider?.rating}</span>
                <span className="text-xs text-text-secondary">({provider?.reviewCount})</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">{provider?.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Provider Details */}
      <div className="p-6 space-y-4">
        {/* Experience & Languages */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">Experience</div>
            <div className="text-sm font-medium text-text-primary">{provider?.experience} years</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">Languages</div>
            <div className="text-sm font-medium text-text-primary">{provider?.languages?.join(', ')}</div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon 
              name="Clock" 
              size={16} 
              className={getAvailabilityColor(provider?.availability)}
            />
            <span className={`text-sm font-medium ${getAvailabilityColor(provider?.availability)}`}>
              {getAvailabilityText(provider?.availability)}
            </span>
          </div>
          {provider?.nextAvailable && (
            <span className="text-xs text-text-secondary">
              Next: {provider?.nextAvailable}
            </span>
          )}
        </div>

        {/* Consultation Types */}
        <div>
          <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Available Services</div>
          <div className="flex flex-wrap gap-2">
            {provider?.consultationTypes?.map((type, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                <Icon 
                  name={type === 'In-Person' ? 'User' : type === 'Video Call' ? 'Video' : 'Phone'} 
                  size={12} 
                  className="mr-1"
                />
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Insurance & Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">Consultation Fee</div>
            <div className="text-sm font-medium text-text-primary">${provider?.consultationFee}</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary uppercase tracking-wider">Insurance</div>
            <div className="flex items-center space-x-1">
              <Icon 
                name={provider?.acceptsInsurance ? "Check" : "X"} 
                size={14} 
                className={provider?.acceptsInsurance ? "text-success" : "text-destructive"}
              />
              <span className="text-sm font-medium text-text-primary">
                {provider?.acceptsInsurance ? 'Accepted' : 'Not Accepted'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="p-6 pt-0 flex space-x-3">
        <Button
          variant="outline"
          onClick={() => onViewProfile(provider?.id)}
          className="flex-1"
        >
          <Icon name="User" size={16} />
          <span className="ml-2">View Profile</span>
        </Button>
        
        <Button
          variant="default"
          onClick={() => onBookAppointment(provider?.id)}
          disabled={provider?.availability === 'busy'}
          className="flex-1"
        >
          <Icon name="Calendar" size={16} />
          <span className="ml-2">Book Appointment</span>
        </Button>
      </div>
    </div>
  );
};

export default ProviderCard;