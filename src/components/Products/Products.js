import React, { useState } from 'react';
import styles from './Products.module.scss';

const Products = () => {
  const initialProducts = [
    { id: 1, name: 'Product 1', basePrice: '10.00', discountPrice: '8.00', stock: 50, category: 'Category 1', description: 'Description 1', image: '' },
    { id: 2, name: 'Product 2', basePrice: '15.00', discountPrice: '12.00', stock: 30, category: 'Category 2', description: 'Description 2', image: '' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setShowModal(true);
    setSelectedProduct({ name: '', basePrice: '', discountPrice: '', stock: '', sold: '', category: '', description: '', image: '' });
  };

  const handleEditProduct = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleSaveChanges = () => {
    if (selectedProduct.id) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = { ...selectedProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
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
            <th>Sold</th>
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
              <td>{product.sold}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteProduct(product.id)}
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
              <textarea
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
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
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
