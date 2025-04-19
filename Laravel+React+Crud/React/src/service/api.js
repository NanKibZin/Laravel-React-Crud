import axios from "axios";
const api= axios.create({
    baseURL:"http://127.0.0.1:8000/api",
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
})
// When API returns 401 error (unauthorized),
// redirect to login page
api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
export default api;

