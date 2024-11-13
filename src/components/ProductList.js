import React, { useEffect, useState } from 'react';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: ''
  });

  const [editingProduct, setEditingProduct] = useState(null); // To handle editing

  // Fetch products on mount
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  // Handle input changes for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
        setNewProduct({ name: '', description: '', price: '' }); // Clear form after adding
      })
      .catch(error => console.log(error));
  };

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:5000/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch(error => console.log(error));
  };

  // Handle updating a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price
    });
  };

  const handleUpdateProduct = () => {
    fetch(`http://localhost:5000/products/${editingProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(updatedProduct => {
        setProducts(products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        ));
        setEditingProduct(null); // Clear editing mode
        setNewProduct({ name: '', description: '', price: '' }); // Clear form
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      
      {/* Form for adding or editing product */}
      <div className="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          placeholder="Product Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          placeholder="Description"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          placeholder="Price"
          onChange={handleInputChange}
        />
        <button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}>
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      {/* Product list */}
      {products.length ? (
        products.map(product => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ProductList;
