import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const RecordCard = ({ record, onView, onShare, onDownload }) => {
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
      'lab-report': 'text-blue-600 bg-blue-50',
      'imaging': 'text-purple-600 bg-purple-50',
      'prescription': 'text-green-600 bg-green-50',
      'visit-notes': 'text-orange-600 bg-orange-50',
      'vaccination': 'text-teal-600 bg-teal-50',
      'wearable': 'text-indigo-600 bg-indigo-50',
      'document': 'text-gray-600 bg-gray-50'
    };
    return colorMap?.[type] || 'text-gray-600 bg-gray-50';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 healthcare-shadow hover:healthcare-shadow-lg healthcare-transition">
      <div className="flex items-start justify-between mb-4">
      
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getRecordColor(record?.type)}`}>
            <Icon name={getRecordIcon(record?.type)} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{record?.title}</h3>
            <p className="text-sm text-text-secondary">{record?.provider}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {record?.isNew && (
            <span className="px-2 py-1 bg-success text-white text-xs font-medium rounded-full">
              New
            </span>
          )}
          {record?.isShared && (
            <Icon name="Users" size={16} className="text-brand-primary" />
          )}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Date:</span>
          <span className="font-medium text-text-primary">{formatDate(record?.date)}</span>
        </div>
        
        {record?.category && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Category:</span>
            <span className="font-medium text-text-primary">{record?.category}</span>
          </div>
        )}

        {record?.size && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Size:</span>
            <span className="font-medium text-text-primary">{record?.size}</span>
          </div>
        )}

        {record?.summary && (
          <div className="text-sm">
            <span className="text-text-secondary">Summary:</span>
            <p className="text-text-primary mt-1 line-clamp-2">{record?.summary}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onView(record)}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconPosition="left"
            onClick={() => onShare(record)}
          >
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onDownload(record)}
          >
            Download
          </Button>
        </div>
        
        {record?.urgency && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            record?.urgency === 'high' ? 'bg-red-100 text-red-700' :
            record?.urgency === 'medium'? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            {record?.urgency?.charAt(0)?.toUpperCase() + record?.urgency?.slice(1)} Priority
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordCard;