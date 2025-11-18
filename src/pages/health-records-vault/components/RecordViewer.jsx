import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecordViewer = ({ record, onClose, onShare, onDownload, onPrint }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!record) return null;

  const mockContent = {
    'lab-report': {
      pages: 2,
      content: `LABORATORY REPORT\n\nPatient: John Smith\nDOB: 03/15/1985\nMRN: 12345678\n\nTest Date: October 5, 2025\nReport Date: October 6, 2025\n\nCOMPLETE BLOOD COUNT (CBC)\n\nTest Name                Result      Reference Range    Units\n─────────────────────────────────────────────────────────\nWhite Blood Cells       7.2         4.0-11.0          K/uL\nRed Blood Cells         4.8         4.2-5.4           M/uL\nHemoglobin             14.5         13.5-17.5         g/dL\nHematocrit             42.1         41.0-50.0         %\nPlatelet Count         285         150-450           K/uL\n\nCHEMISTRY PANEL\n\nGlucose                95          70-100            mg/dL\nTotal Cholesterol      185         <200              mg/dL\nHDL Cholesterol        55          >40               mg/dL\nLDL Cholesterol        110         <100              mg/dL\nTriglycerides          98          <150              mg/dL\n\nCLINICAL INTERPRETATION:\nAll values within normal limits. Continue current health maintenance routine.\n\nReviewed by: Dr. Sarah Chen, MD\nPathologist: Dr. Michael Rodriguez, MD`
    },
    'imaging': {
      pages: 1,
      content: `RADIOLOGY REPORT\n\nPatient: John Smith\nExam Date: October 3, 2025\nExam Type: Chest X-Ray (PA and Lateral)\n\nCLINICAL HISTORY:\nRoutine annual physical examination\n\nTECHNIQUE:\nPA and lateral chest radiographs\n\nFINDINGS:\nThe lungs are clear bilaterally with no evidence of consolidation, pleural effusion, or pneumothorax. The cardiac silhouette is normal in size and configuration. The mediastinal contours are unremarkable. No acute bony abnormalities are identified.\n\nIMPRESSION:\nNormal chest radiograph\n\nRadiologist: Dr. Jennifer Park, MD\nDate Reported: October 3, 2025`
    },
    'prescription': {
      pages: 1,
      content: `PRESCRIPTION\n\nPatient: John Smith\nDOB: 03/15/1985\nAddress: 123 Main St, Anytown, ST 12345\n\nPrescriber: Dr. Sarah Chen, MD\nDEA#: BC1234567\nNPI: 1234567890\n\nDate: October 8, 2025\n\nRx: Lisinopril 10mg tablets\nSig: Take one tablet by mouth once daily\nQty: 30 tablets\nRefills: 5\n\nRx: Metformin 500mg tablets\nSig: Take one tablet by mouth twice daily with meals\nQty: 60 tablets\nRefills: 5\n\nGeneric substitution permitted unless "Dispense as Written" is checked.\n\nElectronic Signature: Dr. Sarah Chen, MD\nDate/Time: 10/08/2025 3:45 PM`
    }
  };

  const content = mockContent?.[record?.type] || { pages: 1, content: 'Content not available for preview.' };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
           
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getRecordIcon(record?.type)} size={18} className="text-brand-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">{record?.title}</h2>
              <p className="text-sm text-text-secondary">{record?.provider} • {new Date(record.date)?.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              onClick={() => onShare(record)}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={() => onDownload(record)}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Printer"
              onClick={() => onPrint(record)}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-4">
            {/* Page Navigation */}
            {content?.pages > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronLeft"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                />
                <span className="text-sm text-text-secondary">
                  Page {currentPage} of {content?.pages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronRight"
                  disabled={currentPage === content?.pages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, content?.pages))}
                />
              </div>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="ZoomOut"
              disabled={zoomLevel === 50}
              onClick={handleZoomOut}
            />
            <span className="text-sm text-text-secondary min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="ZoomIn"
              disabled={zoomLevel === 200}
              onClick={handleZoomIn}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={handleResetZoom}
            />
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto bg-slate-100 p-4">
          <div className="max-w-3xl mx-auto">
            {record?.type === 'imaging' ? (
              // Medical Image Viewer
              (<div className="bg-white rounded-lg healthcare-shadow overflow-hidden">
                <div 
                  className="flex items-center justify-center min-h-[500px] bg-black"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
                    alt="Chest X-Ray"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Study Date:</span>
                      <span className="ml-2 text-text-primary">October 3, 2025</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Modality:</span>
                      <span className="ml-2 text-text-primary">X-Ray</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Body Part:</span>
                      <span className="ml-2 text-text-primary">Chest</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">View:</span>
                      <span className="ml-2 text-text-primary">PA & Lateral</span>
                    </div>
                  </div>
                </div>
              </div>)
            ) : (
              // Document Viewer
              (<div 
                className="bg-white rounded-lg healthcare-shadow p-8 min-h-[600px]"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                <pre className="whitespace-pre-wrap font-mono text-sm text-text-primary leading-relaxed">
                  {content?.content}
                </pre>
              </div>)
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} />
              <span>Created: {new Date(record.date)?.toLocaleDateString()}</span>
            </div>
            {record?.size && (
              <div className="flex items-center space-x-2">
                <Icon name="HardDrive" size={14} />
                <span>Size: {record?.size}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
            >
              Add Note
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Share2"
              iconPosition="left"
              onClick={() => onShare(record)}
            >
              Share Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordViewer;