import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingModal = ({ isOpen, onClose, provider, selectedDate, onConfirmBooking }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [insuranceInfo, setInsuranceInfo] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const appointmentTypes = [
    { value: 'in-person', label: 'In-Person Visit', description: 'Visit the clinic' },
    { value: 'video', label: 'Video Consultation', description: 'Online video call' },
    { value: 'phone', label: 'Phone Consultation', description: 'Voice call only' }
  ];

  const reasonOptions = [
    { value: 'routine-checkup', label: 'Routine Checkup' },
    { value: 'follow-up', label: 'Follow-up Visit' },
    { value: 'new-symptoms', label: 'New Symptoms' },
    { value: 'medication-review', label: 'Medication Review' },
    { value: 'test-results', label: 'Test Results Discussion' },
    { value: 'second-opinion', label: 'Second Opinion' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedTime || !reason) return;

    const bookingData = {
      providerId: provider?.id,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      reason,
      notes,
      insuranceInfo
    };

    onConfirmBooking(bookingData);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg healthcare-shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Book Appointment</h2>
            <p className="text-sm text-text-secondary mt-1">
              Schedule with {provider?.name} on {selectedDate && formatDate(selectedDate)}
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Provider Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{provider?.name}</h3>
              <p className="text-sm text-text-secondary">{provider?.specialty}</p>
              <p className="text-xs text-text-secondary">{provider?.location}</p>
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Select Time Slot *
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots?.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  className="text-sm"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Consultation Type *
            </label>
            <div className="space-y-2">
              {appointmentTypes?.map((type) => (
                <Button
                  key={type?.value}
                  type="button"
                  variant={appointmentType === type?.value ? "default" : "outline"}
                  onClick={() => setAppointmentType(type?.value)}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={type?.value === 'in-person' ? 'User' : type?.value === 'video' ? 'Video' : 'Phone'} 
                      size={20} 
                    />
                    <div className="text-left">
                      <div className="font-medium">{type?.label}</div>
                      <div className="text-xs opacity-80">{type?.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Reason for Visit */}
          <Select
            label="Reason for Visit *"
            options={reasonOptions}
            value={reason}
            onChange={setReason}
            placeholder="Select reason for your visit"
            required
          />

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              placeholder="Any specific concerns or information for the provider..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Insurance Information */}
          <Input
            label="Insurance Information"
            type="text"
            value={insuranceInfo}
            onChange={(e) => setInsuranceInfo(e?.target?.value)}
            placeholder="Insurance provider and policy number"
            description="Optional: Provide your insurance details for billing"
          />

          {/* Appointment Summary */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Appointment Summary</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <div>Date: {selectedDate && formatDate(selectedDate)}</div>
              <div>Time: {selectedTime || 'Not selected'}</div>
              <div>Type: {appointmentTypes?.find(t => t?.value === appointmentType)?.label}</div>
              <div>Fee: ${provider?.consultationFee}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!selectedTime || !reason}
              className="flex-1"
            >
              <Icon name="Calendar" size={16} />
              <span className="ml-2">Confirm Booking</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;