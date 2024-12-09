import React, { useState } from "react";
import styles from "./Accounts.module.scss";

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, username: "john_doe", role: "Admin" },
    { id: 2, username: "jane_doe", role: "User" },
  ]);

  const [editAccount, setEditAccount] = useState(null);
  const [formValues, setFormValues] = useState({ username: "", role: "" });

  const handleEditClick = (account) => {
    setEditAccount(account.id);
    setFormValues({ username: account.username, role: account.role });
  };

  const handleSave = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === editAccount
          ? { ...account, username: formValues.username, role: formValues.role }
          : account
      )
    );
    setEditAccount(null);
  };

  const handleDelete = (id) => {
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2>Manage Accounts</h2>
      <table className={styles.accountsTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.username}</td>
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
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={formValues.username}
                  onChange={(e) =>
                    setFormValues({ ...formValues, username: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={formValues.role}
                  onChange={(e) =>
                    setFormValues({ ...formValues, role: e.target.value })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.saveButton} onClick={handleSave}>
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
