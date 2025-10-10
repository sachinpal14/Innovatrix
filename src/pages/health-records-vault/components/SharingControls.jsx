import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SharingControls = ({ record, onShare, onRevoke, onClose }) => {
  const [shareEmail, setShareEmail] = useState('');
  const [shareRole, setShareRole] = useState('view');
  const [shareExpiry, setShareExpiry] = useState('30-days');
  const [shareNotifications, setShareNotifications] = useState(true);

  const shareRoles = [
    { value: 'view', label: 'View Only' },
    { value: 'comment', label: 'View & Comment' },
    { value: 'edit', label: 'View & Edit' }
  ];

  const expiryOptions = [
    { value: '1-day', label: '1 Day' },
    { value: '7-days', label: '7 Days' },
    { value: '30-days', label: '30 Days' },
    { value: '90-days', label: '90 Days' },
    { value: 'never', label: 'Never Expires' }
  ];

  const currentShares = [
    {
      id: 1,
      email: 'dr.johnson@citygeneralhospital.com',
      name: 'Dr. Michael Johnson',
      role: 'edit',
      sharedDate: '2025-10-05T10:30:00Z',
      expiryDate: '2025-11-05T10:30:00Z',
      lastAccessed: '2025-10-08T09:15:00Z',
      status: 'active'
    },
    {
      id: 2,
      email: 'sarah.chen@familycare.com',
      name: 'Dr. Sarah Chen',
      role: 'view',
      sharedDate: '2025-10-03T14:20:00Z',
      expiryDate: '2025-11-03T14:20:00Z',
      lastAccessed: '2025-10-07T16:45:00Z',
      status: 'active'
    },
    {
      id: 3,
      email: 'mom@email.com',
      name: 'Margaret Smith (Mother)',
      role: 'view',
      sharedDate: '2025-10-01T08:00:00Z',
      expiryDate: null,
      lastAccessed: '2025-10-08T12:30:00Z',
      status: 'active'
    }
  ];

  const handleShare = () => {
    if (shareEmail?.trim()) {
      onShare({
        email: shareEmail,
        role: shareRole,
        expiry: shareExpiry,
        notifications: shareNotifications
      });
      setShareEmail('');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    const colorMap = {
      'view': 'bg-blue-100 text-blue-700',
      'comment': 'bg-yellow-100 text-yellow-700',
      'edit': 'bg-green-100 text-green-700'
    };
    return colorMap?.[role] || 'bg-gray-100 text-gray-700';
  };

  const getRoleIcon = (role) => {
    const iconMap = {
      'view': 'Eye',
      'comment': 'MessageCircle',
      'edit': 'Edit'
    };
    return iconMap?.[role] || 'User';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Sharing Controls</h2>
            <p className="text-sm text-text-secondary mt-1">{record?.title}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Share New */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="UserPlus" size={18} className="mr-2" />
              Share with Someone New
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e?.target?.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Permission Level"
                  options={shareRoles}
                  value={shareRole}
                  onChange={setShareRole}
                />

                <Select
                  label="Access Expires"
                  options={expiryOptions}
                  value={shareExpiry}
                  onChange={setShareExpiry}
                />
              </div>

              <Checkbox
                label="Send notification email"
                checked={shareNotifications}
                onChange={(e) => setShareNotifications(e?.target?.checked)}
              />

              <Button
                variant="default"
                iconName="Share2"
                iconPosition="left"
                onClick={handleShare}
                disabled={!shareEmail?.trim()}
              >
                Share Record
              </Button>
            </div>
          </div>

          {/* Current Shares */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="Users" size={18} className="mr-2" />
              Currently Shared With ({currentShares?.length})
            </h3>

            <div className="space-y-3">
              {currentShares?.map((share) => (
                <div key={share?.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={18} className="text-brand-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-primary">{share?.name}</h4>
                        <p className="text-sm text-text-secondary">{share?.email}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                          <span>Shared: {formatDate(share?.sharedDate)}</span>
                          <span>Expires: {formatDate(share?.expiryDate)}</span>
                          <span>Last accessed: {formatDate(share?.lastAccessed)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(share?.role)}`}>
                        <Icon name={getRoleIcon(share?.role)} size={12} className="inline mr-1" />
                        {shareRoles?.find(r => r?.value === share?.role)?.label}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Settings"
                      />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onRevoke(share?.id)}
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={18} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Privacy & Security</h4>
                <p className="text-sm text-blue-700">
                  All shared records are encrypted and access is logged for security. 
                  You can revoke access at any time. Recipients will be notified of any changes to their access permissions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
          >
            Download Sharing Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharingControls;