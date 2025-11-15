import React, { useState } from 'react';
import { ShoppingCart, Package, DollarSign, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { RxCross1 } from "react-icons/rx";
import OrderConfirmation from './medicine-order-confirmation';
import { useSelector } from 'react-redux';




export default function MedicineOrderForm({ medicine, onClose }) {

  const user = useSelector((state) => state.user.loggedUser || {});


  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calculate total
  const total = (medicine.price * quantity).toFixed(2);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    if (quantity > medicine.quantity) {
      newErrors.quantity = `Only ${medicine.quantity} units available in stock`;
    }

    if (quantity > 100) {
      newErrors.quantity = "Maximum order quantity is 100 units";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
    // Clear errors when user starts typing
    if (errors.quantity) {
      setErrors({});
    }
  };

  // Handle form submit
  const handleBuy = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate order processing
      setOrderSuccess(true);
      console.log("Order placed successfully")

      // Reset form after 5 seconds
      
        
        setQuantity(1);
      
    }
  };

  // Check if medicine is expired
  const isExpired = new Date(medicine.expiryDate) < new Date();
  const isExpiringSoon = () => {
    const today = new Date();
    const expiry = new Date(medicine.expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const data = {

    quantity,
    orderDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    orderId: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
    customerName: user.fullname || "Guest",
    items: [{ name: medicine.name, quantity, price: medicine.price, exprityDate: medicine.expiryDate, mfgDate: medicine.mfgDate, ingredients: medicine.ingredients, disease: medicine.disease }],
    subtotal: total,
    tax: (total * 0.1).toFixed(2), // Assuming 10% tax
    shipping: 5.00, // Flat shipping rate
    total: (parseFloat(total) + parseFloat((total * 0.1).toFixed(2)) + 5.00).toFixed(2)


  }

  return (
    <>
      {!orderSuccess &&  <div className="min-h-screen bg-gradient-to-br from-blue-50 relative to-purple-50 p-4 mt-10 sm:p-6 lg:p-8">
        <button
          onClick={() => {
            setTimeout(() => {
              onClose()
            }, 100);
          }}
          className='text-2xl absolute top-50 right-10 hover:scale-110 transition-all duration-500 active:rotate-180'> <RxCross1 /> </button>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Package className="w-10 h-10 text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Medicine Order Form</h1>
            </div>
            <p className="text-gray-600">Complete your purchase with ease</p>
          </div>

          

          {/* Warning if expired or expiring soon */}
          {isExpired && (
            <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900">Medicine Expired</p>
                <p className="text-sm text-red-700">This medicine has expired and cannot be ordered.</p>
              </div>
            </div>
          )}

          {!isExpired && isExpiringSoon() && (
            <div className="mb-6 bg-orange-50 border-2 border-orange-500 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-orange-900">Expiring Soon</p>
                <p className="text-sm text-orange-700">This medicine will expire within 90 days.</p>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          {!orderSuccess && <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Medicine Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{medicine.name || "name"}</h2>
              <p className="text-blue-100">{medicine.category || "none"}</p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleBuy} className="p-6 space-y-6">
              {/* Medicine Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ingredients */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Ingredients
                  </label>
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <p className="text-gray-900 font-medium">{medicine.ingredients || "none"}</p>
                  </div>
                </div>

                {/* Used For */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Used For
                  </label>
                  <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                    <p className="text-gray-900 font-medium">{medicine.disease || "none"}</p>
                  </div>
                </div>

                {/* Manufacturing Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Manufacturing Date
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                    <p className="text-gray-900 font-medium">{formatDate(medicine.mfgDate)}</p>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Date
                  </label>
                  <div className={`rounded-lg p-4 border-2 ${isExpired ? 'bg-red-50 border-red-200' :
                    isExpiringSoon() ? 'bg-orange-50 border-orange-200' :
                      'bg-green-50 border-green-200'
                    }`}>
                    <p className={`font-medium ${isExpired ? 'text-red-900' :
                      isExpiringSoon() ? 'text-orange-900' :
                        'text-green-900'
                      }`}>
                      {formatDate(medicine.expiryDate)}
                    </p>
                  </div>
                </div>

                {/* Price Per Unit */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price Per Unit
                  </label>
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                    <p className="text-purple-900 font-bold text-2xl">${medicine.price.toFixed(2) || "N/A "}</p>
                  </div>
                </div>

                {/* Available Stock */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Available Stock
                  </label>
                  <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200">
                    <p className="text-indigo-900 font-bold text-2xl">{medicine.quantity} units</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-200"></div>

              {/* Quantity Selection */}
              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Select Quantity <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={medicine.quantity}
                    disabled={isExpired}
                    className={`w-full px-4 py-4 text-lg font-semibold border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.quantity
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                      } ${isExpired ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                    placeholder="Enter quantity"
                  />
                  {errors.quantity && (
                    <div className="mt-2 flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm font-medium">{errors.quantity}</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum order quantity: 100 units</p>
              </div>

              {/* Total Amount */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Total Amount
                    </p>
                    <p className="text-4xl font-bold text-green-600">${total}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {quantity} unit{quantity !== 1 ? 's' : ''} × ${medicine.price.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="w-16 h-16 text-green-500 opacity-20" />
                </div>
              </div>

              {/* Buy Button */}
              <button
                type="submit"
                disabled={isExpired}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform ${isExpired
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 active:scale-95'
                  }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {isExpired ? 'Cannot Order - Expired' : 'Buy Now'}
              </button>

              {/* Additional Info */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Medicine ID: <span className="font-mono font-semibold">#{medicine.id.toString().padStart(3, '0')}</span>
                </p>
              </div>
            </form>
          </div>
          }

          {/* Footer Note */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Please consult with a healthcare professional before purchasing medicine.</p>
          </div>
        </div>
      </div>
      }

      {/* Success Message */}
          {orderSuccess && (
            <OrderConfirmation data={data} setOrderSuccess={setOrderSuccess}  />
          )}
    </>

  );
}
