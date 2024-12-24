// import React, { useState } from 'react';
// import styles from './Orders.module.scss'; // Import styles from SCSS module

// const Orders = () => {
//   const initialOrders = [
//     { id: 1, customer: 'John Doe', total: 100, status: 'Pending', date: '2024-12-01' },
//     { id: 2, customer: 'Jane Smith', total: 200, status: 'Shipped', date: '2024-12-02' },
//   ];

//   const [orders, setOrders] = useState(initialOrders);

//   const updateStatus = (id, newStatus) => {
//     const updatedOrders = orders.map((order) =>
//       order.id === id ? { ...order, status: newStatus } : order
//     );
//     setOrders(updatedOrders);
//   };

//   return (
//     <div className={styles.ordersContainer}>
//       <h2>Manage Orders</h2>
//       <table className={styles.ordersTable}>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Customer</th>
//             <th>Order Date</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.customer}</td>
//               <td>{order.date}</td>
//               <td>${order.total.toFixed(2)}</td>
//               <td>
//                 <select
//                   onChange={(e) => updateStatus(order.id, e.target.value)}
//                   value={order.status}
//                   className={styles.statusDropdown}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </td>
//               <td>
//                 <button className={styles.actionButton}>View</button>
//                 <button className={styles.actionButton}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;


import React, { useState } from 'react';
import styles from './Orders.module.scss'; // Import styles from SCSS module

const Orders = () => {
  const initialOrders = [
    {
      id: 1,
      customer: 'John Doe',
      phone: '123-456-7890',
      address: '123 Main St, Springfield',
      items: [
        { id: 101, name: 'Product A', quantity: 2, price: 25.00, status: 'Pending', orderDate: '2024-12-02' },
        { id: 102, name: 'Product B', quantity: 1, price: 50.00, status: 'Pending', orderDate: '2024-12-03' },
      ],
    },
    {
      id: 2,
      customer: 'Jane Smith',
      phone: '987-654-3210',
      address: '456 Elm St, Shelbyville',
      items: [
        { id: 103, name: 'Product C', quantity: 3, price: 30.00, status: 'Shipped', orderDate: '2024-12-04' },
      ],
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Search handler
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter handler
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const updateItemStatus = (orderId, itemId, newStatus) => {
    // Map over orders and update the item status
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map((item) =>
            item.id === itemId ? { ...item, status: newStatus } : item
          ),
        };
      }
      return order;
    });
  
    setOrders(updatedOrders); // Update the orders state to reflect the new status
  };
  
  const deleteOrder = (id) => {
    const filteredOrders = orders.filter((order) => order.id !== id);
    setOrders(filteredOrders);
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Filter orders based on search query and status
  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch = filterStatus ? order.items.some(item => item.status === filterStatus) : true;

    return searchMatch && statusMatch;
  });

  // Calculate the total price for an order
  const calculateTotal = (items) => {
    return items
      .reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        return total + item.quantity * price;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.pageTitle}>Manage Orders</h2>

      <div className={styles.actionsRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by customer, phone, or address"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className={styles.filterContainer}>
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            className={styles.statusFilter}
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipping">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => viewOrder(order)}
                >
                  View
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Order Details</h2>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <select
                        onChange={(e) =>
                          updateItemStatus(selectedOrder.id, item.id, e.target.value)
                        }
                        value={item.status}
                        className={styles.statusDropdown}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{item.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Display Total */}
            <div className={styles.totalPrice}>
              <strong>Total: </strong>${calculateTotal(selectedOrder.items)}
            </div>

            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
