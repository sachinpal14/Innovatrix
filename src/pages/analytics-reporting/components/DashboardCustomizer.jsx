import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DashboardCustomizer = ({ isOpen, onClose, onSave, currentLayout }) => {
  const [selectedWidgets, setSelectedWidgets] = useState(currentLayout || []);

  const availableWidgets = [
    {
      id: 'patient-metrics',
      name: 'Patient Metrics',
      description: 'Patient satisfaction, wait times, and volume statistics',
      category: 'Clinical',
      icon: 'Users'
    },
    {
      id: 'financial-overview',
      name: 'Financial Overview',
      description: 'Revenue, costs, and billing performance indicators',
      category: 'Financial',
      icon: 'DollarSign'
    },
    {
      id: 'staff-productivity',
      name: 'Staff Productivity',
      description: 'Healthcare provider efficiency and workload metrics',
      category: 'Operational',
      icon: 'Activity'
    },
    {
      id: 'disease-surveillance',
      name: 'Disease Surveillance',
      description: 'Infectious disease tracking and outbreak monitoring',
      category: 'Public Health',
      icon: 'Shield'
    },
    {
      id: 'resource-utilization',
      name: 'Resource Utilization',
      description: 'Equipment, bed occupancy, and facility usage rates',
      category: 'Operational',
      icon: 'BarChart3'
    },
    {
      id: 'quality-measures',
      name: 'Quality Measures',
      description: 'Clinical outcomes, safety metrics, and compliance scores',
      category: 'Clinical',
      icon: 'Award'
    },
    {
      id: 'emergency-capacity',
      name: 'Emergency Capacity',
      description: 'ER status, ambulance availability, and crisis response',
      category: 'Emergency',
      icon: 'AlertTriangle'
    },
    {
      id: 'population-health',
      name: 'Population Health',
      description: 'Community health trends and demographic analysis',
      category: 'Public Health',
      icon: 'Globe'
    }
  ];

  const categories = [...new Set(availableWidgets.map(widget => widget.category))];

  const handleWidgetToggle = (widgetId) => {
    setSelectedWidgets(prev => 
      prev?.includes(widgetId) 
        ? prev?.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleSave = () => {
    onSave(selectedWidgets);
    onClose();
  };

  const selectAllInCategory = (category) => {
    const categoryWidgets = availableWidgets?.filter(widget => widget?.category === category)?.map(widget => widget?.id);
    
    const allSelected = categoryWidgets?.every(id => selectedWidgets?.includes(id));
    
    if (allSelected) {
      setSelectedWidgets(prev => prev?.filter(id => !categoryWidgets?.includes(id)));
    } else {
      setSelectedWidgets(prev => [...new Set([...prev, ...categoryWidgets])]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden healthcare-shadow-lg">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Customize Dashboard</h2>
              <p className="text-sm text-text-secondary mt-1">
                Select widgets to display on your analytics dashboard
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} className="p-2">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {categories?.map(category => {
              const categoryWidgets = availableWidgets?.filter(widget => widget?.category === category);
              const allSelected = categoryWidgets?.every(widget => selectedWidgets?.includes(widget?.id));
              const someSelected = categoryWidgets?.some(widget => selectedWidgets?.includes(widget?.id));

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-text-primary">{category}</h3>
                    <Button
                      variant="outline"
                      onClick={() => selectAllInCategory(category)}
                      className="text-xs"
                    >
                      {allSelected ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryWidgets?.map(widget => (
                      <div
                        key={widget?.id}
                        className={`p-4 border rounded-lg healthcare-transition cursor-pointer ${
                          selectedWidgets?.includes(widget?.id)
                            ? 'border-primary bg-primary/5' :'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => handleWidgetToggle(widget?.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedWidgets?.includes(widget?.id)}
                            onChange={() => handleWidgetToggle(widget?.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <Icon name={widget?.icon} size={18} className="text-primary" />
                              <h4 className="font-medium text-text-primary">{widget?.name}</h4>
                            </div>
                            <p className="text-sm text-text-secondary">{widget?.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-muted">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {selectedWidgets?.length} widgets selected
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSave}>
                Save Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomizer;