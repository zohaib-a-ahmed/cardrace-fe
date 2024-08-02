import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getCurrentRoute = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '';
  };

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//         localStorage.removeItem('accessToken');
//         console.log(error.response)
//         console.log(getCurrentRoute())
        
//         if (typeof window !== 'undefined' && getCurrentRoute() == '/dash') {
//           console.log('redirecting yo ass')
//           //window.location.href = '/';
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

export default api;