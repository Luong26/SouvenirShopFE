// import React, { useState, useEffect } from 'react';
// import styles from './Orders.module.scss';
// import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7096/api';

// const Orders = () => {
//   //const [orders, setOrders] = useState([]);
//   const [orders, setOrders] = useState([
//     {
//       id: "order-1",
//       customer: "John Doe",
//       phone: "093-533-1673",
//       address: "123 Main St, Springfield",
//       status: "Pending",
//       orderDate: "2024-12-24T10:30:00",
//       orderItems: [
//         {
//           id: "item-1",
//           orderId: "order-1",
//           productId: "prod-1",
//           quantity: 2,
//           product: {
//             id: "prod-1",
//             name: "Product A",
//             description: "Description of Product A",
//             basePrice: 20.0,
//             discountPrice: 18.0,
//             stockQuantity: 100,
//           },
//         },
//         {
//           id: "item-2",
//           orderId: "order-1",
//           productId: "prod-2",
//           quantity: 1,
//           product: {
//             id: "prod-2",
//             name: "Product B",
//             description: "Description of Product B",
//             basePrice: 15.0,
//             discountPrice: 15.0,
//             stockQuantity: 50,
//           },
//         },
//       ],
//     },
//     {
//       id: "order-2",
//       customer: "Jane Smith",
//       phone: "097-654-3210",
//       address: "456 Elm St, Metropolis",
//       status: "Shipped",
//       orderDate: "2024-12-23T15:45:00",
//       orderItems: [
//         {
//           id: "item-3",
//           orderId: "order-2",
//           productId: "prod-3",
//           quantity: 3,
//           product: {
//             id: "prod-3",
//             name: "Product C",
//             description: "Description of Product C",
//             basePrice: 10.0,
//             discountPrice: 9.0,
//             stockQuantity: 200,
//           },
//         },
//       ],
//     },
//   ]);  
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch orders
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.get(`${API_BASE_URL}/Order`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setOrders(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching orders:', err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // useEffect(() => {
//   //   fetchOrders();
//   // }, []);
//   useEffect(() => {
//     // fetchOrders(); // Comment this out to use fake data only
//   }, []);
  

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setFilterStatus(e.target.value);
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.put(
//         `${API_BASE_URL}/Order/${orderId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (err) {
//       console.error('Error updating order status:', err.message);
//     }
//   };

//   // const deleteOrder = async (orderId) => {
//   //   try {
//   //     const token = localStorage.getItem('authToken');
//   //     await axios.delete(`${API_BASE_URL}/Order/${orderId}`, {
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //       },
//   //     });
//   //     setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
//   //   } catch (err) {
//   //     console.error('Error deleting order:', err.message);
//   //   }
//   // };

//   // const viewOrder = (order) => {
//   //   setSelectedOrder(order);
//   //   setShowModal(true);
//   // };
//   const viewOrder = async (orderId) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.get(`${API_BASE_URL}/Order/${orderId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setSelectedOrder(response.data); // Save the fetched order details
//       setShowModal(true);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching order details:', err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   // Filter orders based on search query and status
//   const filteredOrders = orders.filter((order) => {
//     const searchMatch =
//       (searchQuery === "" || // Allow all orders if search query is empty
//         order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
//       (order.phone?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
//       (order.address?.toLowerCase().includes(searchQuery.toLowerCase()) || '');

//     const statusMatch = filterStatus ? order.status === filterStatus : true;

//     return searchMatch && statusMatch;
//   });

//   // Calculate the total price for an order
//   const calculateTotal = (orderItems) => {
//     if (!Array.isArray(orderItems)) {
//       return '0.00';
//     }
//     return orderItems
//       .reduce((total, item) => {
//         const price = parseFloat(item.product?.discountPrice || item.product?.basePrice || 0);
//         return total + item.quantity * price;
//       }, 0)
//       .toFixed(2);
//   };
  
  

//   return (
//     <div className={styles.ordersContainer}>
//       <h2 className={styles.pageTitle}>Manage Orders</h2>

//       {error && (
//         <div className={styles.errorMessage}>
//           {typeof error === 'object' ? JSON.stringify(error) : error}
//           <button onClick={fetchOrders} className={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       )}
//       {loading && <div className={styles.loadingMessage}>Loading...</div>}

//       <div className={styles.actionsRow}>
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Search by customer, phone, or address"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />
//         </div>

//         <div className={styles.filterContainer}>
//           <label htmlFor="statusFilter">Filter by Status:</label>
//           <select
//             id="statusFilter"
//             className={styles.statusFilter}
//             value={filterStatus}
//             onChange={handleFilterChange}
//           >
//             <option value="">All</option>
//             <option value="Pending">Pending</option>
//             <option value="Processing">Processing</option>
//             <option value="Shipped">Shipped</option>
//             <option value="Delivered">Delivered</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>

//       <table className={styles.ordersTable}>
//         <thead>
//           <tr>
//             <th>Customer Name</th>
//             <th>Phone Number</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.customer}</td>
//               <td>{order.phone}</td>
//               <td>{order.address}</td>
//               <td>
//                 <button
//                   className={styles.viewButton}
//                   onClick={() => viewOrder(order)}
//                 >
//                   View
//                 </button>
//                 {/* <button
//                   className={styles.deleteButton}
//                   onClick={() => deleteOrder(order.id)}
//                 >
//                   Delete
//                 </button> */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && selectedOrder && (
//   <div className={styles.modal}>
//     <div className={styles.modalContent}>
//       <h2 className={styles.modalTitle}>Order Details</h2>

//       {/* Display Order Date and Status */}
//       <div className={styles.orderInfo}>
//         <div>
//           <strong>Order Date: </strong>{new Date(selectedOrder.orderDate).toLocaleString()}
//         </div>
//         <div>
//           <strong>Status: </strong>
//           {selectedOrder.status}
//         </div>
//       </div>

//       {/* Render Items */}
//       <table className={styles.itemsTable}>
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {selectedOrder.orderItems.map((item) => (
//             <tr key={item.id}>
//               <td>{item.product?.name || 'N/A'}</td>
//               <td>{item.quantity}</td>
//               <td>${item.product?.discountPrice || item.product?.basePrice || '0.00'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Display Total */}
//       <div className={styles.totalPrice}>
//         <strong>Total: </strong>${calculateTotal(selectedOrder.orderItems)}
//       </div>

//       <button className={styles.closeButton} onClick={() => setShowModal(false)}>
//         Close
//       </button>
//     </div>
//   </div>
// )}

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
      status: 'Pending', // Status moved here
      orderDate: '2024-12-02', // Order date moved here
      items: [
        { id: 101, name: 'Product A', quantity: 2, price: 25.00 },
        { id: 102, name: 'Product B', quantity: 1, price: 50.00 },
      ],
    },
    {
      id: 2,
      customer: 'Jane Smith',
      phone: '987-654-3210',
      address: '456 Elm St, Shelbyville',
      status: 'Shipped',
      orderDate: '2024-12-04',
      items: [
        { id: 103, name: 'Product C', quantity: 3, price: 30.00 },
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

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
  
    setOrders(updatedOrders);
  
    // Update selectedOrder to reflect the change immediately in the modal
    setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
  };
  

  // const deleteOrder = (id) => {
  //   const filteredOrders = orders.filter((order) => order.id !== id);
  //   setOrders(filteredOrders);
  // };

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
  
    const statusMatch = filterStatus ? order.status === filterStatus : true;
  
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
            <option value="Shipped">Shipped</option>
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
                {/* <button
                  className={styles.deleteButton}
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Order Details</h2>

            {/* Order status and date */}
            <div className={styles.orderInfo}>
              <div>
                <strong>Status: </strong>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className={styles.statusDropdown}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <strong>Order Date: </strong>{selectedOrder.orderDate}
              </div>
            </div>

            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
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
