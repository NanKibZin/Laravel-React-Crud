// src/service/authService.js

export const setupAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // example for axios
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Auth header set with token:", token);
    }
  };
  