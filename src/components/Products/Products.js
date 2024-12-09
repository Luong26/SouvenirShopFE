import React, { useState } from 'react';
import styles from './Products.module.scss';

const Products = () => {
  const initialProducts = [
    { id: 1, name: 'Product 1', price: '10.00', category: 'Category 1', image: '' },
    { id: 2, name: 'Product 2', price: '15.00', category: 'Category 2', image: '' },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = () => {
    setShowModal(true);
    setSelectedProduct({ name: '', price: '', category: '', image: '' });
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
      <button className={styles.addProductButton} onClick={handleAddProduct}>
        Add Product
      </button>
      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
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

      {/* Modal for adding/editing product */}
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
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={selectedProduct.price}
                onChange={handleInputChange}
              />
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={selectedProduct.category}
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
