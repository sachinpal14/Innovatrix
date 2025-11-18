import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecordCard from './components/RecordCard';
import TimelineView from './components/TimelineView';
import SearchFilters from './components/SearchFilters';
import WearableIntegration from './components/WearableIntegration';
import SharingControls from './components/SharingControls';
import RecordViewer from './components/RecordViewer';

const HealthRecordsVault = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showSharingModal, setShowSharingModal] = useState(false);
  const [showRecordViewer, setShowRecordViewer] = useState(false);
  const [recordToShare, setRecordToShare] = useState(null);

  // Mock health records data
  const healthRecords = [
    {
      id: 1,
      title: "Complete Blood Count (CBC)",
      type: "lab-report",
      provider: "City General Hospital",
      date: "2025-10-05T10:30:00Z",
      category: "Laboratory",
      size: "245 KB",
      summary: "Comprehensive blood analysis including white blood cells, red blood cells, hemoglobin, and platelet count. All values within normal limits.",
      isNew: true,
      isShared: false,
      urgency: "low"
    },
    {
      id: 2,
      title: "Chest X-Ray Report",
      type: "imaging",
      provider: "Advanced Imaging Plus",
      date: "2025-10-03T14:20:00Z",
      category: "Radiology",
      size: "2.1 MB",
      summary: "PA and lateral chest radiographs showing clear lungs with no evidence of consolidation or abnormalities.",
      isNew: true,
      isShared: true,
      urgency: "low"
    },
    {
      id: 3,
      title: "Prescription - Lisinopril & Metformin",
      type: "prescription",
      provider: "Family Care Practice",
      date: "2025-10-08T15:45:00Z",
      category: "Medication",
      size: "89 KB",
      summary: "Monthly prescription refill for blood pressure and diabetes management medications.",
      isNew: true,
      isShared: false,
      urgency: "medium"
    },
    {
      id: 4,
      title: "Annual Physical Examination",
      type: "visit-notes",
      provider: "Wellness Medical Clinic",
      date: "2025-09-28T09:00:00Z",
      category: "Primary Care",
      size: "156 KB",
      summary: "Comprehensive annual physical examination with vital signs, system review, and preventive care recommendations.",
      isNew: false,
      isShared: true,
      urgency: "low"
    },
    {
      id: 5,
      title: "COVID-19 Vaccination Record",
      type: "vaccination",
      provider: "City Health Department",
      date: "2025-09-15T11:30:00Z",
      category: "Immunization",
      size: "78 KB",
      summary: "Updated COVID-19 booster vaccination record with batch number and administration details.",
      isNew: false,
      isShared: false,
      urgency: "low"
    },
    {
      id: 6,
      title: "Heart Rate & Activity Data",
      type: "wearable",
      provider: "Apple Watch Series 9",
      date: "2025-10-08T16:00:00Z",
      category: "Wearable Device",
      size: "1.2 MB",
      summary: "Daily heart rate monitoring, step count, and workout data automatically synced from wearable device.",
      isNew: true,
      isShared: false,
      urgency: "low"
    },
    {
      id: 7,
      title: "Cardiology Consultation Report",
      type: "visit-notes",
      provider: "Heart & Cardio Center",
      date: "2025-09-20T13:15:00Z",
      category: "Specialist Care",
      size: "298 KB",
      summary: "Follow-up cardiology consultation with ECG results and treatment plan adjustments for hypertension management.",
      isNew: false,
      isShared: true,
      urgency: "high"
    },
    {
      id: 8,
      title: "Lipid Panel Results",
      type: "lab-report",
      provider: "LabCorp Diagnostics",
      date: "2025-09-25T08:45:00Z",
      category: "Laboratory",
      size: "187 KB",
      summary: "Comprehensive lipid panel showing cholesterol levels, triglycerides, and cardiovascular risk assessment.",
      isNew: false,
      isShared: false,
      urgency: "medium"
    }
  ];

  // Filter records based on search and filters
  const filteredRecords = healthRecords?.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      record?.provider?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      record?.summary?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesType = selectedType === 'all' || record?.type === selectedType;
    const matchesProvider = selectedProvider === 'all' || 
      record?.provider?.toLowerCase()?.includes(selectedProvider?.toLowerCase());
    
    // Simple date range filtering
    const matchesDate = dateRange === 'all' || (() => {
      const recordDate = new Date(record.date);
      const now = new Date();
      const daysDiff = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24));
      
      switch (dateRange) {
        case 'last-week': return daysDiff <= 7;
        case 'last-month': return daysDiff <= 30;
        case 'last-3-months': return daysDiff <= 90;
        case 'last-6-months': return daysDiff <= 180;
        case 'last-year': return daysDiff <= 365;
        default: return true;
      }
    })();

    return matchesSearch && matchesType && matchesProvider && matchesDate;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedProvider('all');
    setDateRange('all');
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowRecordViewer(true);
  };

  const handleShareRecord = (record) => {
    setRecordToShare(record);
    setShowSharingModal(true);
  };

  const handleDownloadRecord = (record) => {
    // Mock download functionality
    console.log('Downloading record:', record?.title);
    // In a real app, this would trigger a file download
  };

  const handlePrintRecord = (record) => {
    // Mock print functionality
    console.log('Printing record:', record?.title);
    window.print();
  };

  const handleSyncDevice = (deviceId) => {
    console.log('Syncing device:', deviceId);
    // Mock device sync functionality
  };

  const handleShare = (shareData) => {
    console.log('Sharing record with:', shareData);
    setShowSharingModal(false);
    setRecordToShare(null);
  };

  const handleRevokeAccess = (shareId) => {
    console.log('Revoking access for share ID:', shareId);
  };

  const handleUploadRecord = () => {
    // Mock file upload
    console.log('Opening file upload dialog');
  };

  const handleViewWearableDetails = () => {
    console.log('Viewing wearable analytics');
  };

  const stats = [
    {
      label: 'Total Records',
      value: healthRecords?.length,
      icon: 'FileText',
      color: 'text-brand-primary'
    },
    {
      label: 'New This Week',
      value: healthRecords?.filter(r => r?.isNew)?.length,
      icon: 'Plus',
      color: 'text-success'
    },
    {
      label: 'Shared Records',
      value: healthRecords?.filter(r => r?.isShared)?.length,
      icon: 'Users',
      color: 'text-secondary'
    },
    {
      label: 'Storage Used',
      value: '12.4 MB',
      icon: 'HardDrive',
      color: 'text-warning'
    }
  ];

  // Mock wearable data for WearableIntegration component
  const wearableData = {
    devices: [
      {
        id: 'apple-watch-1',
        name: 'Apple Watch Series 9',
        type: 'smartwatch',
        status: 'connected',
        lastSync: '2025-10-08T16:00:00Z',
        batteryLevel: 85,
        dataTypes: ['heart_rate', 'steps', 'workout', 'sleep']
      }
    ],
    recentData: {
      steps: 8432,
      heartRate: 72,
      workouts: 2,
      sleepHours: 7.5
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={setSidebarCollapsed} 
      /> */}
      <main className={`pt-16 healthcare-transition `}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Health Records Vault</h1>
              <p className="text-text-secondary mt-1">
                Secure, searchable digital health records with timeline view and sharing controls
              </p>
            </div>
            
            {/* <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                onClick={handleUploadRecord}
              >
                Upload Record
              </Button>
              <Button
                variant="default"
                iconName="Scan"
                iconPosition="left"
              >
                Scan Document
              </Button>
            </div> */}
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats?.map((stat, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 healthcare-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat?.label}</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">{stat?.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center ${stat?.color}`}>
                    <Icon name={stat?.icon} size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          {/* Search and Filters */}
          {/* <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedProvider={selectedProvider}
            onProviderChange={setSelectedProvider}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onClearFilters={handleClearFilters}
          /> */}

          {/* View Toggle and Results */}
          <div className="bg-white border border-slate-200 rounded-lg healthcare-shadow">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-text-primary">
                  Health Records ({filteredRecords?.length})
                </h2>
                {searchQuery && (
                  <span className="text-sm text-text-secondary">
                    Showing results for "{searchQuery}"
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                
                <Button
                  variant={activeView === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Grid3X3"
                  onClick={() => setActiveView('grid')}
                >Reports</Button>
                {/* <Button
                  variant={activeView === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Clock"
                  onClick={() => setActiveView('timeline')}
                  
                >Pescriptions</Button> */}
                {/* <Button
                  variant="ghost"
                  size="sm"
                  iconName="SlidersHorizontal"
                /> */}
              </div>
            </div>

            <div className="p-6">
              {activeView === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecords?.map((record) => (
                    <RecordCard
                      key={record?.id}
                      record={record}
                      onView={handleViewRecord}
                      onShare={handleShareRecord}
                      onDownload={handleDownloadRecord}
                    />
                  ))}
                </div>
              ) : (
                <TimelineView
                  records={filteredRecords}
                  onRecordClick={handleViewRecord}
                />
              )}

              {filteredRecords?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">No Records Found</h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search criteria or filters to find what you're looking for.
                  </p>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Wearable Integration */}
          {/* <WearableIntegration
            wearableData={wearableData}
            onSyncDevice={handleSyncDevice}
            onViewDetails={handleViewWearableDetails}
          /> */}
        </div>
      </main>
      {/* Modals */}
      {showRecordViewer && selectedRecord && (
        <RecordViewer
          record={selectedRecord}
          onClose={() => {
            setShowRecordViewer(false);
            setSelectedRecord(null);
          }}
          onShare={handleShareRecord}
          onDownload={handleDownloadRecord}
          onPrint={handlePrintRecord}
        />
      )}
      {showSharingModal && recordToShare && (
        <SharingControls
          record={recordToShare}
          onShare={handleShare}
          onRevoke={handleRevokeAccess}
          onClose={() => {
            setShowSharingModal(false);
            setRecordToShare(null);
          }}
        />
      )}
    </div>
  );
};

export default HealthRecordsVault;