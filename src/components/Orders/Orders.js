import React, { useState } from 'react';
import styles from './Orders.module.scss';  // Import styles from SCSS module

const Orders = () => {
  const initialOrders = [
    { id: 1, customer: 'John Doe', status: 'Pending', date: '2024-12-01' },
    { id: 2, customer: 'Jane Smith', status: 'Shipped', date: '2024-12-02' },
  ];

  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className={styles.ordersContainer}>
      <h2>Manage Orders</h2>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>
                <select
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  value={order.status}
                  className={styles.statusDropdown}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
