import api from "./api";
export const getProducts = async () => {
    try {
        const response = await api.get("/product");
        let products = await response.data.products;
        console.log(products)
        return products;

    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
export const createProduct = async (data) => {
    try {
        const response = await api.post("/product", data);
        return response;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        let response=await api.delete(`/product/${id}`);
        if(response.status==200){
            getProducts();
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};
export const updateProduct = async (id, product) => {
    try {
        const response = await api.post(`/product/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Save token to localStorage
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    
    if (response.data.token) {
      // Save token
      saveToken(response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// Register function
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/register', { name, email, password });
    
    if (response.data.token) {
      // Save token
      saveToken(response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Register error:", error);
    return false;
  }
};

// Logout function
export const logoutUser = () => {
  removeToken();
  window.location.href = '/login';
};

// Add token to request headers
export const setupAuthHeader = () => {
  const token = getToken();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  isLoggedIn,
  setupAuthHeader
};