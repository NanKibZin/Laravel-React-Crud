import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../service/productService';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products,setProduct]=useState([]);
  useEffect(()=>{
    const fetchProducts=async ()=>{
      let data= await getProducts();
      setProduct(data)
    }
    fetchProducts();
  },[])
  
  console.log(products);
  return (
    <div>
      <div className=' d-flex justify-content-between align-items-center mb-lg-2 mb-5'>
            <h3>Product</h3>
            <a href="create" className='btn btn-danger'>Add Product</a>
        </div>
    <table className='table '>
      <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Active</th>
          </tr>
      </thead>
      <tbody>
        {products.map((product)=>(
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.qty}</td>
          <td className=''>
          <Link to={`/edit/${product.id}`} className='btn btn-warning me-2'>Edit</Link>
            <button onClick={()=>deleteProduct(product.id)} className='btn btn-primary mx-3'>Delete</button>
          </td>
        </tr>
        ))
        }
      </tbody>
    </table>
    </div>
  )
}

export default ProductList
