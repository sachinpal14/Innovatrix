import React, { useState, useMemo } from 'react';
import { Search, Package, AlertCircle, CheckCircle, XCircle, DollarSign, Calendar, Clock } from 'lucide-react';

import MedicineOrderForm from './medicine-order-form.jsx';
import { medicinesData } from '../../../utils/medicinedemo.js';


export default function MedicineDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const filteredMedicines = useMemo(() => {
        if (!searchTerm.trim()) return medicinesData;

        const term = searchTerm.toLowerCase();
        return medicinesData.filter(med =>
            med.name.toLowerCase().includes(term) ||
            med.ingredients.toLowerCase().includes(term) ||
            med.disease.toLowerCase().includes(term) ||
            med.category.toLowerCase().includes(term)
        );
    }, [searchTerm]);

    const getStockStatus = (quantity) => {
        if (quantity >= 300) return { status: 'high', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
        if (quantity >= 150) return { status: 'medium', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertCircle };
        return { status: 'low', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle };
    };

    const getExpiryStatus = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));

        if (daysUntilExpiry < 0) return { status: 'expired', color: 'text-red-600', label: 'Expired' };
        if (daysUntilExpiry <= 90) return { status: 'expiring', color: 'text-orange-600', label: 'Expiring Soon' };
        return { status: 'valid', color: 'text-green-600', label: 'Valid' };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const [pay, setPay] = useState(false);
    const handlePayClick = () => {
        setPay(!pay);
      
    }




    return (
        <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-purple-50">
            {/* Header */}



            {!pay ? <div className="max-w-7xl  mt-10 mx-auto  px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by medicine name, ingredients, disease, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                        />
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                        Total <span className="font-semibold text-blue-600">{filteredMedicines.length}</span> medicine{filteredMedicines.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Medicine List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
                                <h2 className="text-xl font-semibold text-white">Available Medicines</h2>
                            </div>

                            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                                {filteredMedicines.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {filteredMedicines.map((medicine) => {
                                            const stockInfo = getStockStatus(medicine.quantity);
                                            const StockIcon = stockInfo.icon;
                                            const expiryInfo = getExpiryStatus(medicine.expiryDate);

                                            return (
                                                <button
                                                    key={medicine.id}
                                                    onClick={() => setSelectedMedicine(medicine)}
                                                    className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${selectedMedicine?.id === medicine.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-semibold text-gray-900 text-lg">{medicine.name}</h3>
                                                                {/* {expiryInfo.status === 'expiring' && (
                                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Expiring</span>
                                )}
                                {expiryInfo.status === 'expired' && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Expired</span>
                                )} */}
                                                            </div>
                                                            <p className="text-sm text-gray-600 mb-1">{medicine.category}</p>
                                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                <span className="flex items-center gap-1">
                                                                    <DollarSign className="w-3 h-3" />
                                                                    ${medicine.price.toFixed(2)}
                                                                </span>
                                                                <span>Qty: {medicine.quantity}</span>
                                                            </div>
                                                        </div>

                                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${stockInfo.bg} flex-shrink-0`}>
                                                            <StockIcon className={`w-4 h-4 ${stockInfo.color}`} />
                                                            <span className={`text-sm font-semibold ${stockInfo.color}`}>
                                                                {medicine.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center">
                                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 text-lg">No medicines found matching your search</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Medicine Details */}
                    <div className="lg:col-span-1">
                        <div className=" medicine-details bg-white max-h-[calc(100vh-270px)] rounded-xl shadow-md overflow-y-auto sticky top-8 ">
                            {selectedMedicine ? (
                                <div>
                                    <div className="py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
                                        <h2 className="text-xl font-semibold text-white">Medicine Details</h2>
                                    </div>

                                    <div className="px-6 py-4">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedMedicine.name}</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Category</label>
                                                <p className="mt-1 text-gray-900 bg-purple-50 px-3 py-2 rounded-lg inline-block">
                                                    {selectedMedicine.category}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Price</label>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <DollarSign className="w-5 h-5 text-green-600" />
                                                    <p className="text-2xl font-bold text-green-600">
                                                        ${selectedMedicine.price.toFixed(2)}
                                                    </p>
                                                    <span className="text-sm text-gray-500">per unit</span>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Ingredients</label>
                                                <p className="mt-1 text-gray-900 bg-blue-50 px-4 py-3 rounded-lg">
                                                    {selectedMedicine.ingredients}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Used For</label>
                                                <p className="mt-1 text-gray-900 bg-green-50 px-4 py-3 rounded-lg">
                                                    {selectedMedicine.disease.map((d, index) => (
                                                        <span key={index} className="inline-block mr-2">{d}</span>
                                                    ))}
                                                </p>
                                            </div>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Stock Quantity</label>
                                                <div className="mt-2">
                                                    {(() => {
                                                        const stockInfo = getStockStatus(selectedMedicine.quantity);
                                                        const StockIcon = stockInfo.icon;
                                                        return (
                                                            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${stockInfo.bg}`}>
                                                                <StockIcon className={`w-6 h-6 ${stockInfo.color}`} />
                                                                <div>
                                                                    <p className={`text-2xl font-bold ${stockInfo.color}`}>
                                                                        {selectedMedicine.quantity}
                                                                    </p>
                                                                    <p className={`text-sm ${stockInfo.color}`}>
                                                                        {stockInfo.status === 'high' ? 'Good Stock' :
                                                                            stockInfo.status === 'medium' ? 'Moderate Stock' : 'Low Stock'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Mfg Date
                                                    </label>
                                                    <p className="mt-1 text-gray-900 bg-gray-50 px-3 py-2 rounded-lg text-sm">
                                                        {formatDate(selectedMedicine.mfgDate)}
                                                    </p>
                                                </div>

                                                <div>
                                                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        Expiry Date
                                                    </label>
                                                    {(() => {
                                                        const expiryInfo = getExpiryStatus(selectedMedicine.expiryDate);
                                                        return (
                                                            <div>
                                                                <p className={`mt-1 ${expiryInfo.color} font-semibold px-3 py-2 rounded-lg text-sm ${expiryInfo.status === 'expired' ? 'bg-red-50' :
                                                                        expiryInfo.status === 'expiring' ? 'bg-orange-50' : 'bg-green-50'
                                                                    }`}>
                                                                    {formatDate(selectedMedicine.expiryDate)}
                                                                </p>
                                                                <p className={`text-xs mt-1 ${expiryInfo.color}`}>
                                                                    {expiryInfo.label}
                                                                </p>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-500">
                                                    Medicine ID: <span className="font-mono font-semibold">#{selectedMedicine.id.toString().padStart(3, '0')}</span>
                                                </p>

                                            </div>
                                            <div className='w-full flex justify-end items-center '>

                                                <button
                                                    onClick={handlePayClick}
                                                    className='bg-green-700 rounded-lg px-8 py-2 text-xl text-white font-semibold cursor-pointer hover:bg-green-400 hover:text-black transition-all duration-500 active:scale-75'>Order Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg mb-2">No medicine selected</p>
                                    <p className="text-sm text-gray-400">Click on any medicine from the list to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div> : (<MedicineOrderForm medicine={selectedMedicine} onClose={handlePayClick} />)}

             
        </div>
    );
}