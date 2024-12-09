import React, { useState } from 'react';
import styles from './Vouchers.module.scss';  // Import styles from SCSS module

const Vouchers = () => {
  const initialVouchers = [
    { id: 1, code: 'VOUCHER1', discount: '10%', validUntil: '2024-12-31' },
    { id: 2, code: 'VOUCHER2', discount: '20%', validUntil: '2024-12-31' },
  ];

  const [vouchers, setVouchers] = useState(initialVouchers);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleAddVoucher = () => {
    setShowModal(true);
    setSelectedVoucher({ code: '', discount: '', validUntil: '' });
  };

  const handleEditVoucher = (voucher) => {
    setShowModal(true);
    setSelectedVoucher(voucher);
  };

  const handleDeleteVoucher = (id) => {
    const updatedVouchers = vouchers.filter((voucher) => voucher.id !== id);
    setVouchers(updatedVouchers);
  };

  const handleSaveChanges = () => {
    if (selectedVoucher.id) {
      const updatedVouchers = vouchers.map((voucher) =>
        voucher.id === selectedVoucher.id ? selectedVoucher : voucher
      );
      setVouchers(updatedVouchers);
    } else {
      const newVoucher = { ...selectedVoucher, id: vouchers.length + 1 };
      setVouchers([...vouchers, newVoucher]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVoucher({ ...selectedVoucher, [name]: value });
  };

  return (
    <div className={styles.vouchersContainer}>
      <h2>Manage Vouchers</h2>
      <button className={styles.addVoucherButton} onClick={handleAddVoucher}>Add Voucher</button>
      <table className={styles.vouchersTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Valid Until</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher.id}>
              <td>{voucher.id}</td>
              <td>{voucher.code}</td>
              <td>{voucher.discount}</td>
              <td>{voucher.validUntil}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditVoucher(voucher)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteVoucher(voucher.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing voucher */}
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
              <label>Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={selectedVoucher.validUntil}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.saveChangesButton} onClick={handleSaveChanges}>Save Changes</button>
              <button className={styles.cancelButton} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vouchers;
