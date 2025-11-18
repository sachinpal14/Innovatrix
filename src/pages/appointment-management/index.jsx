import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import AppointmentCalendar from './components/AppointmentCalendar';
import SpecialtyFilter from './components/SpecialtyFilter';
import ProviderCard from './components/ProviderCard';
import AppointmentList from './components/AppointmentList';
import BookingModal from './components/BookingModal';
import QueueStatus from './components/QueueStatus';

const AppointmentManagement = () => {

  const [activeTab, setActiveTab] = useState('book');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Mock data for appointments
  const mockAppointments = [
    {
      id: 1,
      date: "2025-10-10",
      time: "09:30",
      provider: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
      },
      type: "video",
      status: "confirmed",
      reason: "Follow-up consultation",
      location: "Main Hospital - Room 205",
      instructions: "Please have your recent ECG reports ready for review during the consultation."
    },
    {
      id: 2,
      date: "2025-10-12",
      time: "14:00",
      provider: {
        name: "Dr. Michael Chen",
        specialty: "Dermatology",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
      },
      type: "in-person",
      status: "confirmed",
      reason: "Skin examination",
      location: "North Campus - Dermatology Wing"
    },
    {
      id: 3,
      date: "2025-10-15",
      time: "11:00",
      provider: {
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrics",
        avatar: "https://images.unsplash.com/photo-1594824475317-8b7f0c5c0b8e?w=150&h=150&fit=crop&crop=face"
      },
      type: "phone",
      status: "pending",
      reason: "Vaccination consultation",
      location: "Downtown Center"
    }
  ];

  // Mock data for providers
  const mockProviders = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      qualification: "MD, FACC",
      experience: 15,
      rating: 4.9,
      reviewCount: 234,
      location: "Main Hospital",
      languages: ["English", "Spanish"],
      availability: "available",
      nextAvailable: "Today 2:30 PM",
      consultationFee: 250,
      acceptsInsurance: true,
      consultationTypes: ["In-Person", "Video Call"],
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      qualification: "MD, Dermatology",
      experience: 12,
      rating: 4.8,
      reviewCount: 189,
      location: "North Campus",
      languages: ["English", "Mandarin"],
      availability: "limited",
      nextAvailable: "Tomorrow 10:00 AM",
      consultationFee: 200,
      acceptsInsurance: true,
      consultationTypes: ["In-Person", "Video Call", "Phone Call"],
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      isOnline: false
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      qualification: "MD, Pediatrics",
      experience: 8,
      rating: 4.9,
      reviewCount: 156,
      location: "Downtown Center",
      languages: ["English", "Spanish", "Portuguese"],
      availability: "available",
      nextAvailable: "Today 4:00 PM",
      consultationFee: 180,
      acceptsInsurance: true,
      consultationTypes: ["In-Person", "Video Call"],
      avatar: "https://images.unsplash.com/photo-1594824475317-8b7f0c5c0b8e?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      qualification: "MD, Orthopedic Surgery",
      experience: 20,
      rating: 4.7,
      reviewCount: 298,
      location: "Main Hospital",
      languages: ["English"],
      availability: "busy",
      nextAvailable: "Next Week",
      consultationFee: 300,
      acceptsInsurance: false,
      consultationTypes: ["In-Person"],
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      isOnline: false
    }
  ];

  // Mock queue data
  const mockQueueData = [
    {
      id: 1,
      department: "Cardiology",
      location: "Main Hospital - 2nd Floor",
      status: "on-time",
      currentPatients: 3,
      avgWaitTime: 15,
      nextAvailable: "2:30 PM",
      completedToday: 12,
      totalToday: 18,
      recentUpdate: "Dr. Johnson is running on schedule"
    },
    {
      id: 2,
      department: "Emergency",
      location: "Main Hospital - Ground Floor",
      status: "delayed",
      currentPatients: 8,
      avgWaitTime: 45,
      nextAvailable: "3:15 PM",
      completedToday: 24,
      totalToday: 35,
      recentUpdate: "Higher than usual patient volume"
    },
    {
      id: 3,
      department: "Pediatrics",
      location: "Downtown Center",
      status: "on-time",
      currentPatients: 2,
      avgWaitTime: 10,
      nextAvailable: "2:00 PM",
      completedToday: 8,
      totalToday: 12
    }
  ];

  const filteredProviders =
    searchQuery.trim() === ""
      ? [] // show nothing until user types
      : mockProviders.filter(provider => {
        const query = searchQuery.toLowerCase();

        const name = provider.name.toLowerCase();
        const specialty = provider.specialty.toLowerCase();

        return (
          name.includes(query) ||
          specialty.includes(query)
        );
      });




  const handleBookAppointment = (providerId) => {
    const provider = mockProviders?.find(p => p?.id === providerId);
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (bookingData) => {
    console.log('Booking confirmed:', bookingData);
    setShowBookingModal(false);
    setSelectedProvider(null);
    // Here you would typically make an API call to create the appointment
  };

  const handleViewProfile = (providerId) => {
    console.log('View provider profile:', providerId);
    // Navigate to provider profile page
  };

  const handleReschedule = (appointmentId) => {
    console.log('Reschedule appointment:', appointmentId);
    // Open reschedule modal
  };

  const handleCancel = (appointmentId) => {
    console.log('Cancel appointment:', appointmentId);
    // Show confirmation dialog and cancel appointment
  };

  const handleJoinCall = (appointmentId) => {
    console.log('Join call for appointment:', appointmentId);
    // Navigate to teleconsultation
  };

  const tabs = [
    { id: 'book', name: 'Book Appointment', icon: 'Calendar' },
    { id: 'appointments', name: 'My Appointments', icon: 'Clock' },
    { id: 'queue', name: 'Queue Status', icon: 'Users' }
  ];

  return (
    <div className="min-h-screen bg-surface overflow-hidden flex justify-center w-sceen">
      <Header />
      
      <main className={`pt-14 healthcare-transition  overflow-hidden fixed w-full   h-full `}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Appointment Management</h1>
                <p className="text-text-secondary ">
                  Schedule appointments, manage your healthcare calendar, and track queue status
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Icon name="Download" size={16} />
                  <span className="ml-2">Export Schedule</span>
                </Button>

                <Button variant="default">
                  <Icon name="Plus" size={16} />
                  <span className="ml-2">Quick Book</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm healthcare-transition ${activeTab === tab?.id
                      ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-slate-300'
                      }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'book' && (
            <div className="  overflow-hidden min-w-screen">


              {/* Main Content */}
              <div className="lg:col-span-3  w-full">

                <div className="bg-white rounded-lg  w-[100%] border border-slate-200 healthcare-shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Search Doctors</h3>
                    <Icon name="Search" size={20} className="text-text-secondary" />
                  </div>

                  <Input
                    type="text"
                    placeholder="Search by doctor name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="mb-4"
                  />

                  <div className="text-sm text-text-secondary">


                    Found {filteredProviders?.length} doctor{filteredProviders?.length !== 1 ? 's' : ''}...

                  </div>
                </div>

                {/* Provider Cards */}
                <div className=" px-6 py-2 provider-card-parent grid grid-cols-2 gap-4   overflow-y-scroll h-[300px] rounded-lg border-none healthcare-shadow ">


                  {filteredProviders?.map((provider) => (
                    <ProviderCard
                      key={provider?.id}
                      provider={provider}
                      onBookAppointment={handleBookAppointment}
                      onViewProfile={handleViewProfile}
                    />
                  ))}

                  {filteredProviders?.length === 0 && (
                    <div className="col-span-2 text-center text-text-secondary flex flex-col items-center justify-center space-y-2">
                      <Icon name="Search" size={32} className="text-text-secondary" />
                      <p>Try to change or criteria found doctors...</p>
                    </div>
                  )}
                </div>

              </div>






            </div>

          )}

          {activeTab === 'appointments' && (
            <div className='w-full h-full '>
              <div className="max-w-full p-4 mx-auto">
                <div className="">
                  <h2 className="text-xl font-semibold text-text-primary">My Appointments</h2>  
                  <p className="text-text-secondary ">
                    View, manage, and track your upcoming and past appointments
                  </p>
                </div>
               <div className='my-appointments overflow-y-scroll h-[500px] px-4 py-10'>
                 <AppointmentList
                  appointments={mockAppointments}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  onJoinCall={handleJoinCall}
                /> 
               </div>
              </div>
            </div>
              
            
          )}

          {activeTab === 'queue' && (
           <div className=' w-full'>
            <QueueStatus queueData={mockQueueData} />
           </div>
          )}
        </div>
      </main>
      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedProvider(null);
        }}
        provider={selectedProvider}
        selectedDate={selectedDate}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default AppointmentManagement;