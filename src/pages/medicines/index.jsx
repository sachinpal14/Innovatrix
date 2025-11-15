import React from 'react'
import MedicineDashboard from './components/medicine-dashboard'
import Header from '../../components/ui/Header'
import OrderConfirmation from './components/medicine-order-confirmation'

const Medicines = () => {
  return (
    <div>
        <Header/>
        <MedicineDashboard />
        {/* <OrderConfirmation/> */}
    </div>
  )
}

export default Medicines