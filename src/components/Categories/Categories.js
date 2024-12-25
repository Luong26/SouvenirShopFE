import React, { useState, useEffect } from "react";
import styles from "./Categories.module.scss";
import axios from "axios";

const API_BASE_URL = 'https://localhost:7096/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      const response = await axios.get(`${API_BASE_URL}/Category`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCategories(response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error fetching categories:", err.message);
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // Call fetchCategories when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount

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

  const handleSaveChanges = async () => {
    if (!selectedCategory.name || !selectedCategory.description || !selectedCategory.imageFile) {
      alert("All fields are required: Name, Description, and an Image.");
      return;
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("authToken");
  
      // Prepare FormData
      const formData = new FormData();
      formData.append("Name", selectedCategory.name);
      formData.append("Description", selectedCategory.description);
      formData.append("File", selectedCategory.imageFile); // File object from input
  
      const response = await axios.post(`${API_BASE_URL}/Category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Category added successfully:", response.data);
  
      // Assuming the backend response includes the 'id' of the newly created category
      const newCategory = response.data;
  
      // Update categories state with the new category, including the generated id
      setCategories([...categories, newCategory]);
  
      // Set selectedCategory to the newly created category including its ID
      setSelectedCategory(newCategory);
  
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error("Error adding category:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = async () => {
    if (!selectedCategory.name || !selectedCategory.description || !selectedCategory.imageUrl) {
      alert("All fields are required: Name, Description, and Image.");
      return;
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("authToken");
  
      // Prepare the data for PUT request
      const updatedCategory = {
        name: selectedCategory.name,
        description: selectedCategory.description,
        imageUrl: selectedCategory.imageUrl, // Use the image URL if it is already uploaded
      };
  
      const response = await axios.put(
        `${API_BASE_URL}/Category/${selectedCategory.id}`, // Use the ID of the category for PUT request
        updatedCategory, // Send the data as JSON
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set content type as application/json
          },
        }
      );
  
      console.log("Category updated successfully:", response.data);
  
      // Find the updated category and replace it in the categories state
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id ? response.data : category
        )
      );
  
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error("Error updating category:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory({ ...selectedCategory, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }
  
    const validTypes = ["image/jpeg", "image/png"];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
  
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Only PNG and JPG are allowed.");
      return;
    }
  
    if (file.size > maxSizeInBytes) {
      alert("File is too large. Maximum size is 2 MB.");
      return;
    }
  
    // Save file for uploading
    setSelectedCategory({ ...selectedCategory, imageFile: file });
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
            {/* <th>Image</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              {/* <td>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className={styles.imagePreview}
                  />
                ) : (
                  "No Image"
                )}
              </td> */}
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{selectedCategory.id ? "Edit Category" : "Add Category"}</h3>
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
              {/* <label>Image</label>
              <input type="file" onChange={handleImageChange} />
              {selectedCategory.imageUrl && (
                <img
                  src={selectedCategory.imageUrl}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )} */}
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.saveChangesButton}
                onClick={selectedCategory.id ? handleEditChange : handleSaveChanges}
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
