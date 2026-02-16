import './OrdersPage.css';
import { Header } from '../../components/Header';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react'
import { OrdersPageContainer } from './OrdersPageContainer';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <Fragment key={order.id}>
                <OrdersPageContainer order={order}/>
              </Fragment>
            );
          })}

        </div>
      </div>
    </>
  );
}
