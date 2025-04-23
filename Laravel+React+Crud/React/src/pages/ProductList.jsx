import React, { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from '../service/productService';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const fetchProducts = async (query = '') => {
    let data = await getProducts(query);
    setProducts(data);
  };

  // Initial load of all products
  useEffect(() => {
    fetchProducts();
  }, []);

  // This function will be passed to NavBar
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProducts(query);
  };

  // Function to handle the refresh button - shows all products
  const handleRefresh = () => {
    setSearchQuery('');
    fetchProducts(''); // Empty query to get all products
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-lg-2 mb-5'>
        <h3>Product</h3>
        <a href="create" className='btn btn-danger'>Add Product</a>
      </div>
      
      {/* Search input directly in the product list */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          onClick={() => handleSearch(searchQuery)} 
          className='btn btn-primary me-2'
        >
          Search
        </Button>
        <Button 
          onClick={handleRefresh} 
          className='btn btn-secondary'
        >
          Refresh All
        </Button>
      </div>
      
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>
                  <Link to={`/edit/${product.id}`} className='btn btn-warning me-2'>Edit</Link>
                  <button onClick={() => deleteProduct(product.id).then(() => fetchProducts(searchQuery))} className='btn btn-primary mx-3'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;