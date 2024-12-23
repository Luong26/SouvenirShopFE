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
      setVouchers(response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error fetching vouchers:", err.message);
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers(); // Call fetchVouchers when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount

  const handleAddVoucher = () => {
    setShowModal(true);
    setSelectedVoucher({ code: '', discount: '', validUntil: '', maxUsage: 1 });
  };

  const handleEditVoucher = (voucher) => {
    setShowModal(true);
    setSelectedVoucher(voucher);
  };

  const handleSaveChanges = () => {
    if (selectedVoucher.id) {
      const updatedVouchers = vouchers.map((voucher) =>
        voucher.id === selectedVoucher.id ? selectedVoucher : voucher
      );
      setVouchers(updatedVouchers);
    } else {
      const newVoucher = { ...selectedVoucher, id: vouchers.length + 1, currentUsage: 0, status: 'Active' };
      setVouchers([...vouchers, newVoucher]);
    }
    setShowModal(false);
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
  const filteredVouchers = vouchers.filter(
    (voucher) =>
      (filterStatus === 'All' || voucher.status.toLowerCase() === filterStatus.toLowerCase()) &&
      voucher.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatus = (voucher) => {
    const today = new Date().toISOString().split('T')[0];
    return new Date(voucher.validUntil) >= new Date(today) ? 'Active' : 'Expired';
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
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
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
              <th>#</th>
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
                <td>{voucher.id}</td>
                <td>{voucher.code}</td>
                <td>{voucher.discount}</td>
                <td>{voucher.validUntil}</td>
                <td>{getStatus(voucher)}</td>
                <td>{voucher.currentUsage}</td>
                <td>{voucher.maxUsage}</td>
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
                type="text"
                name="discount"
                value={selectedVoucher.discount}
                onChange={handleInputChange}
              />
              <label>Expiration Date</label>
              <input
                type="date"
                name="validUntil"
                value={selectedVoucher.validUntil}
                onChange={handleInputChange}
              />
              <label>Max Usage Count</label>
              <input
                type="number"
                name="maxUsage"
                value={selectedVoucher.maxUsage}
                min="1"
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.saveChangesButton} onClick={handleSaveChanges}>
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
