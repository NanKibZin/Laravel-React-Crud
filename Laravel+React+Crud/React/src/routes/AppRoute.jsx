import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Master from '../layout/master'
import ProductList from '../pages/ProductList'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import NavBar from '../pages/NavBar'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AppRoute = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div>
      <NavBar onSearch={handleSearch} />
     <Routes>
        <Route path='/' element={<Master/>}>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
           <Route index element={<ProductList  searchQuery={searchQuery}/>}/>
           <Route path='create' element={<AddProduct/>}/>
           <Route path='edit/:id' element={<EditProduct/>}/>
        </Route>
     </Routes> 
    </div>
  )
}

export default AppRoute
// import React, { useEffect } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { setupAuthHeader } from '../service/authService';
// // import { setupAuthHeader } from '../service/authService';

// // Components
// // import Navbar from '../components/NavBar';
// import Navbar from '../components/NavBar';

// // import Navbar from '../components/Navbar';
// import ProtectedRoute from '../components/ProtectedRoute';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
// import ProductList from '../pages/ProductList';
// import AddProduct from '../pages/AddProduct';
// import EditProduct from '../pages/EditProduct';
// import Master from '../layout/master';

// const AppRoutes = () => {
//   // Set up auth header when app starts
//   useEffect(() => {
//     setupAuthHeader();
//   }, []);
  
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <div className="container mt-4">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           {/* Protected Routes */}
//           <Route path="/" element={
//             <ProtectedRoute>
//               <Master>
//                 <ProductList />
//               </Master>
//             </ProtectedRoute>
//           } />
          
//           <Route path="/create" element={
//             <ProtectedRoute>
//               <Master>
//                 <AddProduct />
//               </Master>
//             </ProtectedRoute>
//           } />
          
//           <Route path="/edit/:id" element={
//             <ProtectedRoute>
//               <Master>
//                 <EditProduct />
//               </Master>
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

// export default AppRoutes;