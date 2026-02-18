import axios from 'axios'
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
      
      response = await axios.get('/api/payment-summary')
      setPaymentSummary(response.data);
    };
  
    fetchCheckoutData();
  }, [cart]);


  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader paymentSummary={paymentSummary}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} 
          loadCart={loadCart}/>

          <PaymentSummary cart={cart} paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}
