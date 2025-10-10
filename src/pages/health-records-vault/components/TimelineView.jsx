import React from 'react';
import Icon from '../../../components/AppIcon';


const TimelineView = ({ records, onRecordClick }) => {
  const groupRecordsByDate = (records) => {
    const grouped = {};
    records?.forEach(record => {
      const date = new Date(record.date)?.toDateString();
      if (!grouped?.[date]) {
        grouped[date] = [];
      }
      grouped?.[date]?.push(record);
    });
    return grouped;
  };

  const getRecordIcon = (type) => {
    const iconMap = {
      'lab-report': 'FileText',
      'imaging': 'Scan',
      'prescription': 'Pill',
      'visit-notes': 'Stethoscope',
      'vaccination': 'Shield',
      'wearable': 'Watch',
      'document': 'File'
    };
    return iconMap?.[type] || 'FileText';
  };

  const getRecordColor = (type) => {
    const colorMap = {
      'lab-report': 'bg-blue-500',
      'imaging': 'bg-purple-500',
      'prescription': 'bg-green-500',
      'visit-notes': 'bg-orange-500',
      'vaccination': 'bg-teal-500',
      'wearable': 'bg-indigo-500',
      'document': 'bg-gray-500'
    };
    return colorMap?.[type] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedRecords = groupRecordsByDate(records);
  const sortedDates = Object.keys(groupedRecords)?.sort((a, b) => new Date(b) - new Date(a));

  return (
    <div className="space-y-8">
      {sortedDates?.map((date, dateIndex) => (
        <div key={date} className="relative">
          {/* Date Header */}
          <div className="flex items-center mb-6">
            <div className="bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold text-sm">
              {formatDate(date)}
            </div>
            <div className="flex-1 h-px bg-slate-200 ml-4"></div>
          </div>

          {/* Records for this date */}
          <div className="space-y-4 ml-8">
            {groupedRecords?.[date]?.map((record, recordIndex) => (
              <div key={record?.id} className="relative flex items-start space-x-4">
                {/* Timeline connector */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full ${getRecordColor(record?.type)} flex items-center justify-center`}>
                    <Icon name={getRecordIcon(record?.type)} size={20} color="white" />
                  </div>
                  {recordIndex < groupedRecords?.[date]?.length - 1 && (
                    <div className="w-px h-16 bg-slate-200 mt-2"></div>
                  )}
                </div>

                {/* Record content */}
                <div className="flex-1 bg-white border border-slate-200 rounded-lg p-4 healthcare-shadow hover:healthcare-shadow-lg healthcare-transition cursor-pointer"
                     onClick={() => onRecordClick(record)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-text-primary">{record?.title}</h4>
                      <p className="text-sm text-text-secondary">{record?.provider}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {record?.isNew && (
                        <span className="px-2 py-1 bg-success text-white text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                      <span className="text-xs text-text-secondary">
                        {new Date(record.date)?.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {record?.summary && (
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {record?.summary}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      {record?.category && (
                        <span className="bg-slate-100 px-2 py-1 rounded">
                          {record?.category}
                        </span>
                      )}
                      {record?.size && <span>{record?.size}</span>}
                    </div>

                    <div className="flex items-center space-x-2">
                      {record?.isShared && (
                        <Icon name="Users" size={14} className="text-brand-primary" />
                      )}
                      <Icon name="ChevronRight" size={14} className="text-text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connector to next date */}
          {dateIndex < sortedDates?.length - 1 && (
            <div className="flex justify-center mt-8">
              <div className="w-px h-8 bg-slate-200"></div>
            </div>
          )}
        </div>
      ))}
      {sortedDates?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Records Found</h3>
          <p className="text-text-secondary">Your health records will appear here as they become available.</p>
        </div>
      )}
    </div>
  );
};

export default TimelineView;