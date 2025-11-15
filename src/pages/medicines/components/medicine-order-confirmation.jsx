import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';

const OrderConfirmation = ({ data,setOrderSuccess }) => {
  
  const [isOpen, setIsOpen] = useState(true);

  // Use props data or fallback to default values
  const orderData = data || {
    orderId: '#ORD-2024-1789',
    customerName: 'John Doe',
    orderDate: 'Nov 15, 2025',
    items: [
      { name: 'Product 1', quantity: 2, price: 49.98 },
      { name: 'Product 2', quantity: 1, price: 29.99 }
    ],
    subtotal: 79.97,
    tax: 8.00,
    shipping: 5.00,
    total: 92.97
  };

  const downloadPDF = () => {
    // Create PDF content as text
    let pdfContent = `ORDER INVOICE\n\n`;
    pdfContent += `Order ID: ${orderData.orderId}\n`;
    pdfContent += `Date: ${orderData.orderDate}\n`;
    pdfContent += `Customer Name: ${orderData.customerName}\n\n`;
    pdfContent += `${'='.repeat(50)}\n\n`;
    pdfContent += `ITEMS:\n`;
    
    orderData.items.forEach(item => {
      pdfContent += `${item.name} (x${item.quantity})${' '.repeat(30 - item.name.length)}$${item.price.toFixed(2)}\n`;
    });
    
    pdfContent += `\n${'='.repeat(50)}\n\n`;
    pdfContent += `Subtotal:${' '.repeat(40)}$${orderData.subtotal}\n`;
    pdfContent += `Tax (10%):${' '.repeat(39)}$${orderData.tax}\n`;
    pdfContent += `Shipping:${' '.repeat(40)}$${orderData.shipping}\n`;
    pdfContent += `\n${'='.repeat(50)}\n`;
    pdfContent += `TOTAL AMOUNT:${' '.repeat(34)}$${orderData.total}\n\n`;
    pdfContent += `Thank you for your order!`;

    // Create and download as text file (simulating PDF)
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Order_Invoice_${orderData.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const handleClose = () => { 
    setIsOpen(false);
    setOrderSuccess(false); // Reset order success state
  }

  return (

    <> 
   {  <div className="h-screen w-full bg-white flex items-center justify-center px-4 py-2">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" flex items-center justify-center bg-black/50 z-[9998] w-full  "
               
            />

            {/* Order Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed  z-[9999] bg-white rounded-2xl shadow-2xl w-full max-w-md px-8 py-4"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all"
              >
                <X size={24} />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={36} className="text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-sm text-gray-500 text-center mb-6">
                Order ID: {orderData.orderId}
              </p>

              {/* Bill Details */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Customer Name:</span>
                  <span className="font-semibold">{orderData.customerName}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Date:</span>
                  <span>{orderData.orderDate}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  {orderData?.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-700 mb-2">
                      <span>{item.name} (x{item.quantity}):</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>${orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%):</span>
                  <span>${orderData.tax}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span>${orderData.shipping}</span>
                </div>

                <div className="border-t-2 border-gray-300 pt-3 mt-3 flex justify-between text-gray-900 font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>${orderData.total}</span>
                </div>
              </div>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadPDF}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={20} />
                Download Bill PDF
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Show button to reopen if closed */}
      {/* {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Show Order Confirmation
        </motion.button>
      )} */}
    </div> } </>
  );
};

export default OrderConfirmation;