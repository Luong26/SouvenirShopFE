import React, { useState } from 'react';
import styles from './Categories.module.scss';

const Categories = () => {
  const initialCategories = [
    { id: 1, name: 'Keychains', description: 'Various souvenir keychains', image: '' },
    { id: 2, name: 'Mugs', description: 'Souvenir mugs and cups', image: '' },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = () => {
    setShowModal(true);
    setSelectedCategory({ name: '', description: '', image: '' });
  };

  const handleEditCategory = (category) => {
    setShowModal(true);
    setSelectedCategory(category);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleSaveChanges = () => {
    if (selectedCategory.id) {
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id ? selectedCategory : category
      );
      setCategories(updatedCategories);
    } else {
      const newCategory = { ...selectedCategory, id: categories.length + 1 };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory({ ...selectedCategory, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedCategory({ ...selectedCategory, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <h2>Categories Management</h2>
      <button className={styles.addCategoryButton} onClick={handleAddCategory}>
        Add Category
      </button>
      <table className={styles.categoriesTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {category.image ? (
                  <img src={category.image} alt={category.name} className={styles.imagePreview} />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{selectedCategory.id ? 'Edit Category' : 'Add Category'}</h3>
            <div className={styles.modalForm}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={selectedCategory.name}
                onChange={handleInputChange}
              />
              <label>Description</label>
              <textarea
                name="description"
                value={selectedCategory.description}
                onChange={handleInputChange}
              />
              <label>Image</label>
              <input type="file" onChange={handleImageChange} />
              {selectedCategory.image && (
                <img
                  src={selectedCategory.image}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.saveChangesButton}
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
