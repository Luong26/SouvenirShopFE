import React, { useState } from "react";
import styles from "./Categories.module.scss";

const Categories = () => {
  const initialCategories = [
    { name: "Keychains", description: "Various souvenir keychains", image: "" },
    { name: "Mugs", description: "Souvenir mugs and cups", image: "" },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddCategory = () => {
    setShowModal(true);
    setSelectedCategory({ name: "", description: "", image: "" });
  };

  const handleEditCategory = (category) => {
    setShowModal(true);
    setSelectedCategory(category);
  };

  const handleDeleteCategory = (name) => {
    setCategories(categories.filter((category) => category.name !== name));
  };

  const handleSaveChanges = () => {
    if (selectedCategory.name) {
      const updatedCategories = categories.map((category) =>
        category.name === selectedCategory.name ? selectedCategory : category
      );
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, selectedCategory]);
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

  // Filter categories by name
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Categories Management</h2>
      <div className={styles.actionsRow}>
        <button className={styles.addCategoryButton} onClick={handleAddCategory}>
          Add Category
        </button>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Categories by Name"
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>
      <table className={styles.categoriesTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.imagePreview}
                  />
                ) : (
                  "No Image"
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
                  onClick={() => handleDeleteCategory(category.name)}
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
            <h3>{selectedCategory.name ? "Edit Category" : "Add Category"}</h3>
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
