import React from 'react'
import { createProduct } from '../service/productService';
import {useNavigate} from 'react-router-dom'
const AddProduct = () => {
  const navigate=useNavigate();
  const handleCreate= async (e)=>{
    e.preventDefault();
    let data=new  FormData(e.target);
    let  status= await createProduct(data);
    if(status){
      navigate('/')
    }
  }
  return (
    <div>
        <div className=' d-flex justify-content-between align-items-center  mb-2'>
            <h3>Add Product</h3>
            <a href="/" className='btn btn-danger'>Back</a>
        </div>
      <form action="" className=' mt-lg-5' onSubmit={handleCreate} >
        <div className='form-group'>
            <label htmlFor="">Product Name</label>
            <input type="text" name='name' className='form-control' />
        </div>
        <div className='form-group'>
            <label htmlFor="">Product Price</label>
            <input type="text" name='price' className='form-control' />
        </div>
        <div className='form-group'>
            <label htmlFor="">Product Qty</label>
            <input type="text" name='qty' className='form-control' />
        </div>
        {/* <div className='form-group'>
            <label htmlFor="">Product Image</label>
            <input type="file" name='name' className='form-control' />
        </div> */}
        <div>
            <button className='btn btn-primary mt-5'>Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
