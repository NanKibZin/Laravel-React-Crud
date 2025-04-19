// import React, { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';

// const EditProduct = () => {
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     qty: ''
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();
//   return (
//     <div>
//         <div className=' d-flex justify-content-between align-items-center  mb-lg-2'>
//             <h3>Update Product</h3>
//             <a href="" className='btn btn-danger'>Back</a>
//         </div>
//       <form action="">
//         <div className='form-group'>
//             <label htmlFor="">Product Name</label>
//             <input type="text" name='name' className='form-control' />
//         </div>
//         <div className='form-group'>
//             <label htmlFor="">Product Desc</label>
//             <input type="text" name='name' className='form-control' />
//         </div>
//         <div className='form-group'>
//             <label htmlFor="">Product Image</label>
//             <input type="file" name='name' className='form-control' />
//         </div>
//         <div>
//             <button className='btn btn-primary'>Add Product</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default EditProduct
import React, { useState, useEffect } from 'react'
import { getProductById, updateProduct } from '../service/productService';
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    qty: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data.status && data.product) {
          setProduct(data.product);
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(id, product);
      if (response) {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center mb-lg-2'>
        <h3>Update Product</h3>
        <a href="/" className='btn btn-danger'>Back</a>
      </div>
      <form onSubmit={handleUpdate}>
        <div className='form-group mb-3'>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name='name'
            className='form-control'
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="price">Product Price</label>
          <input
            type="text"
            name='price'
            className='form-control'
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor="qty">Product Qty</label>
          <input
            type="text"
            name='qty'
            className='form-control'
            value={product.qty}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className='btn btn-primary mt-3'>Update Product</button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct