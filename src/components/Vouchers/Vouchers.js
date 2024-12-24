import React, { useState, useEffect } from 'react';
import styles from './Vouchers.module.scss';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7096/api';

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch vouchers from API
  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      const response = await axios.get(`${API_BASE_URL}/Voucher`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const updatedVouchers = response.data.map((voucher) => {
        const currentDate = new Date();
        const expirationDate = new Date(voucher.expirationDate);
  
        // Check if the voucher needs to be updated
        if (
          (expirationDate <= currentDate || voucher.currentUsageCount >= voucher.maxUsageCount) &&
          voucher.status === 1 // Only update if the status is currently active
        ) {
          updateVoucherStatus(voucher.id, { ...voucher, status: 0 });
          return { ...voucher, status: 0 }; // Update locally
        }
        return voucher;
      });
  
      setVouchers(updatedVouchers);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error('Error fetching vouchers:', err.message);
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Function to update voucher status in the backend
const updateVoucherStatus = async (id, updatedVoucher) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.put(`${API_BASE_URL}/Voucher/${id}`, updatedVoucher, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating voucher status:', error);
  }
};

  useEffect(() => {
    fetchVouchers(); // Call fetchVouchers when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount

  // useEffect(() => {
  //   // Function to check and update the voucher status based on expiration and usage
  //   const updateVoucherStatus = (voucher) => {
  //     const currentDate = new Date();
      
  //     // Check if expiration date has passed or current usage has reached max usage count
  //     if (new Date(voucher.expirationDate) <= currentDate || voucher.currentUsageCount >= voucher.maxUsageCount) {
  //       if (voucher.status !== 0) {
  //         // Update the status to inactive (0)
  //         voucher.status = 0;
  
  //         // Call API to update the voucher status in the backend
  //         axios.put(`${API_BASE_URL}/Voucher/${voucher.id}`, { ...voucher, status: 0 }, {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
  //             'Content-Type': 'application/json',
  //           }
  //         }).then((response) => {
  //           // Update state with new voucher data after status change
  //           setVouchers(vouchers.map(v => v.id === voucher.id ? response.data : v));
  //         }).catch((error) => {
  //           console.error('Error updating voucher status:', error);
  //         });
  //       }
  //     }
  //   };
  
  //   // Loop through each voucher and update the status
  //   vouchers.forEach(updateVoucherStatus);
  
  // }, [vouchers]); // Trigger this effect every time vouchers state changes
  

  const handleAddVoucher = () => {
    setShowModal(true);
    setSelectedVoucher({ code: '', discountAmount: '', expirationDate: '', maxUsageCount: 1, status: 1 }); // Default status to 1 (Active)
  };

  const handleEditVoucher = (voucher) => {
    setShowModal(true);
    setSelectedVoucher(voucher);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVoucher({ ...selectedVoucher, [name]: value });
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter vouchers based on status and search query
  const filteredVouchers = vouchers.filter((voucher) => {
    const statusMatches =
      filterStatus === 'All' || 
      (filterStatus === '1' && voucher.status === 1) || 
      (filterStatus === '0' && voucher.status === 0);
  
    const searchMatches = voucher.code.toLowerCase().includes(searchQuery.toLowerCase());
  
    return statusMatches && searchMatches;
  });
  

  const getStatus = (voucher) => {
    return voucher.status === 1 ? 'Active' : 'Inactive';
  };

  // Save voucher (Add/Edit) API call
  const handleSaveVoucher = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = selectedVoucher.id
        ? await axios.put(`${API_BASE_URL}/Voucher/${selectedVoucher.id}`, selectedVoucher, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        : await axios.post(`${API_BASE_URL}/Voucher`, selectedVoucher, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

      // Update the vouchers state based on whether it's an add or edit operation
      if (selectedVoucher.id) {
        // Update the voucher in the list (editing)
        setVouchers(
          vouchers.map((voucher) =>
            voucher.id === selectedVoucher.id ? response.data : voucher
          )
        );
      } else {
        // Add the new voucher to the list
        setVouchers([...vouchers, response.data]);
      }

      setShowModal(false);
    } catch (err) {
      console.error('Error saving voucher:', err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.vouchersContainer}>
      <h2>Manage Vouchers</h2>

      <div className={styles.actionsRow}>
        <button className={styles.addVoucherButton} onClick={handleAddVoucher}>
          Add Voucher
        </button>
        {/* Added search input */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            id="voucherSearch"
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search voucher by code"
          />
        </div>
        <div className={styles.filterContainer}>
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            className={styles.statusFilter}
            value={filterStatus}
            onChange={handleStatusFilterChange}
          >
            <option value="All">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
      </div>

      {/* Show loading spinner or message while fetching data */}
      {loading && <p>Loading vouchers...</p>}

      {/* Show error message if there's any error */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Show vouchers data after it's fetched */}
      {!loading && !error && (
        <table className={styles.vouchersTable}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Expiration Date</th>
              <th>Status</th>
              <th>Current Usage</th>
              <th>Max Usage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.code}</td>
                <td>{voucher.discountAmount}</td>
                <td>{voucher.expirationDate}</td>
                <td>{getStatus(voucher)}</td>
                <td>{voucher.currentUsageCount}</td>
                <td>{voucher.maxUsageCount}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditVoucher(voucher)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{selectedVoucher.id ? 'Edit Voucher' : 'Add Voucher'}</h3>
            <div className={styles.modalForm}>
              <label>Voucher Code</label>
              <input
                type="text"
                name="code"
                value={selectedVoucher.code}
                onChange={handleInputChange}
              />
              <label>Discount</label>
              <input
                type="number"
                name="discountAmount"
                value={selectedVoucher.discountAmount}
                onChange={handleInputChange}
              />
              <label>Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={selectedVoucher.expirationDate}
                onChange={handleInputChange}
              />
              <label>Max Usage Count</label>
              <input
                type="number"
                name="maxUsageCount"
                value={selectedVoucher.maxUsageCount}
                min="1"
                onChange={handleInputChange}
              />
              <label>Status</label>
              <select
                name="status"
                value={selectedVoucher.status}
                onChange={handleInputChange}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.saveChangesButton} onClick={handleSaveVoucher}>
                Save Changes
              </button>
              <button className={styles.cancelButton} onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vouchers;
