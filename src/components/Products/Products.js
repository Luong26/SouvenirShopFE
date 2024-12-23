// import React, { useState, useEffect } from 'react';
// import styles from './Products.module.scss';
// import axios from 'axios';

// const API_BASE_URL = 'https://localhost:7096/api';

// const Products = () => {

//   // const initialProducts = [
//   //   { id: 1, name: 'Product 1', basePrice: '10.00', discountPrice: '8.00', stock: 50, category: 'Category 1', description: 'Description 1', image: '' },
//   //   { id: 2, name: 'Product 2', basePrice: '15.00', discountPrice: '12.00', stock: 30, category: 'Category 2', description: 'Description 2', image: '' },
//   // ];

//   // const [products, setProducts] = useState(initialProducts);
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/Product`, {
//         method: 'GET',
//         headers: {
//           Accept: '*/*', // Matches the 'accept' header in Swagger
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to fetch products: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setProducts(data);
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       console.error("Error fetching products:", err.message);
//       setError(err.message); // Set the error message
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // Add or update product
//   const saveProduct = async (product) => {
//     const method = product.id ? 'PUT' : 'POST';
//     const url = product.id
//       ? `${API_BASE_URL}/products/${product.id}`
//       : `${API_BASE_URL}/products`;

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(product),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to ${product.id ? 'update' : 'add'} product: ${response.statusText}`);
//       }

//       const savedProduct = await response.json();
//       if (product.id) {
//         // Update the existing product
//         setProducts((prevProducts) =>
//           prevProducts.map((p) => (p.id === product.id ? savedProduct : p))
//         );
//       } else {
//         // Add the new product
//         setProducts((prevProducts) => [...prevProducts, savedProduct]);
//       }
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       setError(err.message); // Set the error message
//     }
//   };

//   // Delete product
//   const deleteProduct = async (id) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to delete product: ${response.statusText}`);
//       }

//       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       setError(err.message); // Set the error message
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddProduct = () => {
//     setShowModal(true);
//     setSelectedProduct({
//       name: '',
//       basePrice: '',
//       discountPrice: '',
//       stock: '',
//       category: '',
//       description: '',
//       image: '',
//     });
//   };

//   const handleEditProduct = (product) => {
//     setShowModal(true);
//     setSelectedProduct(product);
//   };

//   const handleSaveChanges = () => {
//     saveProduct(selectedProduct);
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedProduct({ ...selectedProduct, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedProduct({ ...selectedProduct, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   //old
//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const response = await axios.get(`${API_BASE_URL}/products`);
//   //       setProducts(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching products:', error);
//   //     }
//   //   };
  
//   //   fetchProducts();
//   // }, []);

//   // const handleSearch = (e) => {
//   //   setSearchQuery(e.target.value);
//   // };

//   // const filteredProducts = products.filter((product) =>
//   //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   // const handleAddProduct = () => {
//   //   setShowModal(true);
//   //   setSelectedProduct({ name: '', basePrice: '', discountPrice: '', stock: '', sold: '', category: '', description: '', image: '' });
//   // };

//   // const handleEditProduct = (product) => {
//   //   setShowModal(true);
//   //   setSelectedProduct(product);
//   // };

//   // const handleDeleteProduct = (id) => {
//   //   const updatedProducts = products.filter((product) => product.id !== id);
//   //   setProducts(updatedProducts);
//   // };

//   // // const handleSaveChanges = () => {
//   // //   if (selectedProduct.id) {
//   // //     const updatedProducts = products.map((product) =>
//   // //       product.id === selectedProduct.id ? selectedProduct : product
//   // //     );
//   // //     setProducts(updatedProducts);
//   // //   } else {
//   // //     const newProduct = { ...selectedProduct, id: products.length + 1 };
//   // //     setProducts([...products, newProduct]);
//   // //   }
//   // //   setShowModal(false);
//   // // };
//   // const handleSaveChanges = async () => {
//   //   try {
//   //     if (selectedProduct.id) {
//   //       // Update existing product
//   //       await axios.put(`${API_BASE_URL}/products/${selectedProduct.id}`, selectedProduct);
//   //     } else {
//   //       // Add new product
//   //       const response = await axios.post(`${API_BASE_URL}/products`, selectedProduct);
//   //       setProducts([...products, response.data]);
//   //     }
//   //     setShowModal(false);
//   //   } catch (error) {
//   //     console.error('Error saving product:', error);
//   //   }
//   // };
  

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setSelectedProduct({ ...selectedProduct, [name]: value });
//   // };

//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setSelectedProduct({ ...selectedProduct, image: reader.result });
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   // return (
//   //   <div className={styles.productsContainer}>
//   //     <h2>Manage Products</h2>

//   //     {/* Error Message */}
//   //     {error && (
//   //       <div className={styles.errorMessage}>
//   //         {error}
//   //         <button onClick={fetchProducts} className={styles.retryButton}>
//   //           Retry
//   //         </button>
//   //       </div>
//   //     )}

//   //     {/* Loading State */}
//   //     {loading && <div className={styles.loadingMessage}>Loading...</div>}

//   //     <div className={styles.actionsRow}>
//   //       <button className={styles.addProductButton} onClick={handleAddProduct}>
//   //         Add Product
//   //       </button>
//   //       <div className={styles.searchContainer}>
//   //         <input
//   //           type="text"
//   //           placeholder="Search by product name"
//   //           value={searchQuery}
//   //           onChange={handleSearch}
//   //           className={styles.searchInput}
//   //         />
//   //       </div>
//   //     </div>
//   //     <table className={styles.productsTable}>
//   //       <thead>
//   //         <tr>
//   //           <th>Image</th>
//   //           <th>Name</th>
//   //           <th>Category</th>
//   //           <th>Stock</th>
//   //           <th>Sold</th>
//   //           <th>Description</th>
//   //           <th>Actions</th>
//   //         </tr>
//   //       </thead>
//   //       <tbody>
//   //         {filteredProducts.map((product) => (
//   //           <tr key={product.id}>
//   //             <td>
//   //               {product.image ? (
//   //                 <img
//   //                   src={product.image}
//   //                   alt={product.name}
//   //                   className={styles.productImage}
//   //                 />
//   //               ) : (
//   //                 'No image'
//   //               )}
//   //             </td>
//   //             <td>{product.name}</td>
//   //             <td>{product.category}</td>
//   //             <td>{product.stock}</td>
//   //             <td>{product.sold}</td>
//   //             <td>{product.description}</td>
//   //             <td>
//   //               <button
//   //                 className={styles.editButton}
//   //                 onClick={() => handleEditProduct(product)}
//   //               >
//   //                 Edit
//   //               </button>
//   //               <button
//   //                 className={styles.deleteButton}
//   //                 onClick={() => handleDeleteProduct(product.id)}
//   //               >
//   //                 Delete
//   //               </button>
//   //             </td>
//   //           </tr>
//   //         ))}
//   //       </tbody>
//   //     </table>

//   //     {showModal && (
//   //       <div className={styles.modal}>
//   //         <div className={styles.modalContent}>
//   //           <h3>{selectedProduct.id ? 'Edit Product' : 'Add Product'}</h3>
//   //           <div className={styles.modalForm}>
//   //             <label>Name</label>
//   //             <input
//   //               type="text"
//   //               name="name"
//   //               value={selectedProduct.name}
//   //               onChange={handleInputChange}
//   //             />

//   //             <label>Description</label>
//   //             <textarea
//   //               name="description"
//   //               value={selectedProduct.description}
//   //               onChange={handleInputChange}
//   //             />

//   //             <label>Category</label>
//   //             <input
//   //               type="text"
//   //               name="category"
//   //               value={selectedProduct.category}
//   //               onChange={handleInputChange}
//   //             />

//   //             <label>Stock Quantity</label>
//   //             <input
//   //               type="number"
//   //               name="stock"
//   //               value={selectedProduct.stock}
//   //               onChange={handleInputChange}
//   //             />

//   //             <label>Base Price</label>
//   //             <input
//   //               type="number"
//   //               step="0.01"
//   //               name="basePrice"
//   //               value={selectedProduct.basePrice}
//   //               onChange={handleInputChange}
//   //             />

//   //             <label>Discount Price</label>
//   //             <input
//   //               type="number"
//   //               step="0.01"
//   //               name="discountPrice"
//   //               value={selectedProduct.discountPrice}
//   //               onChange={handleInputChange}
//   //             />

//   //             <label>Image</label>
//   //             <input
//   //               type="file"
//   //               accept="image/*"
//   //               onChange={handleImageChange}
//   //             />
//   //             {selectedProduct.image && (
//   //               <img
//   //                 src={selectedProduct.image}
//   //                 alt="Preview"
//   //                 className={styles.imagePreview}
//   //               />
//   //             )}
//   //           </div>
//   //           <div className={styles.modalButtons}>
//   //             <button
//   //               className={styles.saveChangesButton}
//   //               onClick={handleSaveChanges}
//   //             >
//   //               Save Changes
//   //             </button>
//   //             <button
//   //               className={styles.cancelButton}
//   //               onClick={() => setShowModal(false)}
//   //             >
//   //               Cancel
//   //             </button>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     )}
//   //   </div>
//   // );

//   return (
//     <div className={styles.productsContainer}>
//       <h2>Manage Products</h2>

//       {/* Error Message */}
//       {error && (
//         <div className={styles.errorMessage}>
//           {error}
//           <button onClick={fetchProducts} className={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Loading State */}
//       {loading && <div className={styles.loadingMessage}>Loading...</div>}

//       <div className={styles.actionsRow}>
//         <button className={styles.addProductButton} onClick={handleAddProduct}>
//           Add Product
//         </button>
//         <div className={styles.searchContainer}>
//           <input
//             type="text"
//             placeholder="Search by product name"
//             value={searchQuery}
//             onChange={handleSearch}
//             className={styles.searchInput}
//           />
//         </div>
//       </div>

//       <table className={styles.productsTable}>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Stock</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map((product) => (
//             <tr key={product.id}>
//               <td>
//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className={styles.productImage}
//                   />
//                 ) : (
//                   'No image'
//                 )}
//               </td>
//               <td>{product.name}</td>
//               <td>{product.category}</td>
//               <td>{product.stock}</td>
//               <td>{product.description}</td>
//               <td>
//                 <button
//                   className={styles.editButton}
//                   onClick={() => handleEditProduct(product)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={styles.deleteButton}
//                   onClick={() => deleteProduct(product.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h3>{selectedProduct.id ? 'Edit Product' : 'Add Product'}</h3>
//             <div className={styles.modalForm}>
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={selectedProduct.name}
//                 onChange={handleInputChange}
//               />
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={selectedProduct.description}
//                 onChange={handleInputChange}
//               />
//               <label>Category</label>
//               <input
//                 type="text"
//                 name="category"
//                 value={selectedProduct.category}
//                 onChange={handleInputChange}
//               />
//               <label>Stock Quantity</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={selectedProduct.stock}
//                 onChange={handleInputChange}
//               />
//               <label>Base Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="basePrice"
//                 value={selectedProduct.basePrice}
//                 onChange={handleInputChange}
//               />
//               <label>Discount Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="discountPrice"
//                 value={selectedProduct.discountPrice}
//                 onChange={handleInputChange}
//               />
//               <label>Image</label>
//               <input type="file" accept="image/*" onChange={handleImageChange} />
//               {selectedProduct.image && (
//                 <img
//                   src={selectedProduct.image}
//                   alt="Preview"
//                   className={styles.imagePreview}
//                 />
//               )}
//             </div>
//             <div className={styles.modalButtons}>
//               <button
//                 className={styles.saveChangesButton}
//                 onClick={handleSaveChanges}
//               >
//                 Save Changes
//               </button>
//               <button
//                 className={styles.cancelButton}
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

// };

// export default Products;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.scss';

const API_BASE_URL = 'https://localhost:7096/api'; // Make sure to use your actual API URL

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Product`);
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProduct({ ...selectedProduct, image: file });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const saveProduct = async (product) => {
    if (!product.name || !product.description || !product.basePrice || !product.discountPrice || !product.stock || !product.category) {
      setError('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', product.name);
    formData.append('Description', product.description);
    formData.append('StockQuantity', product.stock);
    formData.append('BasePrice', product.basePrice);
    formData.append('DiscountPrice', product.discountPrice);
    formData.append('SoldQuantity', product.soldQuantity || 0);
    formData.append('CreatedDate', new Date().toISOString());
    formData.append('CategoryId', product.category);

    if (product.image) {
      formData.append('File', product.image);
    }

    const method = product.id ? 'PUT' : 'POST';
    const url = product.id ? `${API_BASE_URL}/Product/${product.id}` : `${API_BASE_URL}/Product`;

    const token = localStorage.getItem('authToken'); 

    try {
      const response = await axios({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: formData,
      });

      if (product.id) {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? response.data : p))
        );
      } else {
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }
      setError(null);
      handleCloseModal();
    } catch (err) {
      setError(`Error: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="productsContainer">
      <h2>Products</h2>
      <div className="actionsRow">
        <input
          type="text"
          placeholder="Search Products"
          className="searchInput"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="addProductButton" onClick={() => setShowModal(true)}>
          Add Product
        </button>
      </div>
      <table className="productsTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.basePrice}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button
                  className="editButton"
                  onClick={() => handleProductClick(product)}
                >
                  Edit
                </button>
                <button
                  className="deleteButton"
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
        <div className="modal">
          <div className="modalContent">
            <h3>{selectedProduct ? 'Edit Product' : 'Add Product'}</h3>
            <div className="modalForm">
              <label>Name</label>
              <input
                type="text"
                value={selectedProduct?.name || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
              />
              <label>Description</label>
              <input
                type="text"
                value={selectedProduct?.description || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
              />
              <label>Stock Quantity</label>
              <input
                type="number"
                value={selectedProduct?.stock || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, stock: e.target.value })
                }
              />
              <label>Base Price</label>
              <input
                type="number"
                value={selectedProduct?.basePrice || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, basePrice: e.target.value })
                }
              />
              <label>Discount Price</label>
              <input
                type="number"
                value={selectedProduct?.discountPrice || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, discountPrice: e.target.value })
                }
              />
              <label>Category ID</label>
              <input
                type="text"
                value={selectedProduct?.category || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, category: e.target.value })
                }
              />
              <label>Product Image</label>
              <input type="file" onChange={handleImageChange} />
              {selectedProduct?.image && (
                <img
                  src={URL.createObjectURL(selectedProduct.image)}
                  alt="preview"
                  className="imagePreview"
                />
              )}
            </div>
            <div className="modalButtons">
              <button
                className="saveChangesButton"
                onClick={() => saveProduct(selectedProduct)}
              >
                Save Changes
              </button>
              <button className="cancelButton" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
};

export default Products;
