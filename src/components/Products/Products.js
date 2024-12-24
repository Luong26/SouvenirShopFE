import React, { useState, useEffect } from 'react';
import styles from './Products.module.scss';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7096/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch products with token from localStorage
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      const response = await axios.get(`${API_BASE_URL}/Product`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setProducts(response.data);
      setError(null); // Clear previous errors
    } catch (err) {
      console.error("Error fetching products:", err.message);
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Add or update product
  // Add or update product
  const saveProduct = async (product) => {
    // Check if required fields are missing
    if (!product.name || !product.category || !product.basePrice || !product.description || !product.stock) {
      setError('Please fill out all required fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append('Name', product.name);
    formData.append('CategoryId', product.category);
    formData.append('BasePrice', product.basePrice);
    formData.append('DiscountPrice', product.discountPrice);
    formData.append('StockQuantity', product.stock);
    formData.append('Description', product.description);
    formData.append('SoldQuantity', product.soldQuantity || 0);
    
    // If an image is provided, append it to the form data
    if (product.image) {
      formData.append('File', product.image); // Assuming product.image is a file object (image)
    }
  
    const method = product.id ? 'PUT' : 'POST';
    const url = product.id ? `${API_BASE_URL}/Product/${product.id}` : `${API_BASE_URL}/Product`;
  
    const token = localStorage.getItem('authToken'); // Retrieve token for authorization
  
    try {
      const response = await axios({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to the headers
          'Content-Type': 'multipart/form-data', // Set content type for form data
        },
        data: formData, // Send form data
      });
  
      console.log('Product created/updated:', response.data);
      // Handle success (e.g., update state, show success message)
      if (product.id) {
        // Update the existing product
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? response.data : p))
        );
      } else {
        // Add the new product
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }
      setError(null); // Clear previous errors
    } catch (error) {
      console.error('Error creating/updating product:', error);
      setError(error.response ? error.response.data : error.message); // Set the error message
    }
  };
  


  // Delete product
  // const deleteProduct = async (id) => {
  //   const token = localStorage.getItem('authToken'); // Retrieve token for authorization

  //   try {
  //     const response = await axios.delete(`${API_BASE_URL}/Product/${id}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`, // Include token in the headers
  //       },
  //     });

  //     if (response.status === 200) {
  //       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  //       setError(null); // Clear previous errors
  //     }
  //   } catch (err) {
  //     setError(err.message); // Set error message
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setShowModal(true);
    setSelectedProduct({
      name: '',
      basePrice: '',
      discountPrice: '',
      stock: '',
      category: '',
      description: '',
      image: '',
    });
  };

  const handleEditProduct = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  // Handle save changes for product
const handleSaveChanges = () => {
  if (selectedProduct) {
    saveProduct(selectedProduct); // Call the saveProduct function
    setShowModal(false); // Close the modal
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProduct({ ...selectedProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.productsContainer}>
      <h2>Manage Products</h2>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          {typeof error === 'object' ? JSON.stringify(error) : error}
          <button onClick={fetchProducts} className={styles.retryButton}>
            Retry
          </button>
        </div>
      )}


      {/* Loading State */}
      {loading && <div className={styles.loadingMessage}>Loading...</div>}

      <div className={styles.actionsRow}>
        <button className={styles.addProductButton} onClick={handleAddProduct}>
          Add Product
        </button>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>

      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                ) : (
                  'No image'
                )}
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                {/* <button
                  className={styles.deleteButton}
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{selectedProduct.id ? 'Edit Product' : 'Add Product'}</h3>
            <div className={styles.modalForm}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleInputChange}
              />
              <label>Description</label>
              <input
                name="description"
                value={selectedProduct.description}
                onChange={handleInputChange}
              />
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={selectedProduct.category}
                onChange={handleInputChange}
              />
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={selectedProduct.stock}
                onChange={handleInputChange}
              />
              <label>Base Price</label>
              <input
                type="number"
                step="0.01"
                name="basePrice"
                value={selectedProduct.basePrice}
                onChange={handleInputChange}
              />
              <label>Discount Price</label>
              <input
                type="number"
                step="0.01"
                name="discountPrice"
                value={selectedProduct.discountPrice}
                onChange={handleInputChange}
              />
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedProduct.image && (
                <img
                  src={selectedProduct.image}
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

export default Products;
