import React, { useState } from "react";
import styles from "./Accounts.module.scss";

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { 
      id: 1, 
      avatar: "https://via.placeholder.com/50", 
      email: "john.doe1@example.com", 
      name: "John Doe", 
      phone: "123-456-7890", 
      role: "Admin" 
    },
    { 
      id: 2, 
      avatar: "https://via.placeholder.com/50", 
      email: "jane.doe2@example.com", 
      name: "Jane Doe", 
      phone: "987-654-3210", 
      role: "User" 
    },
  ]);

  const [editAccount, setEditAccount] = useState(null);
  const [formValues, setFormValues] = useState({
    avatar: "",
    email: "",
    name: "",
    phone: "",
    role: "",
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditClick = (account) => {
    setEditAccount(account.id);
    setFormValues({ 
      avatar: account.avatar, 
      email: account.email, 
      name: account.name, 
      phone: account.phone, 
      role: account.role 
    });
  };

  const handleSave = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === editAccount
          ? { ...account, ...formValues }
          : account
      )
    );
    setEditAccount(null);
  };

  const handleDelete = (id) => {
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter accounts by name or phone number based on search query
  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.phone.includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      <h2>Manage Accounts</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by Name or Phone Number"
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      <table className={styles.accountsTable}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((account) => (
            <tr key={account.id}>
              <td>
                <img src={account.avatar} alt="Avatar" className={styles.avatar} />
              </td>
              <td>{account.email}</td>
              <td>{account.name}</td>
              <td>{account.phone}</td>
              <td>{account.role}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(account)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(account.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editAccount && (
        <div className={styles.overlay}>
          <div className={styles.editForm}>
            <h3>Edit Account</h3>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                {formValues.avatar && (
                  <img
                    src={formValues.avatar}
                    alt="Preview"
                    className={styles.avatarPreview}
                  />
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formValues.role}
                  onChange={handleInputChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setEditAccount(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
