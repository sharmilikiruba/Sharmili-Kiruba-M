import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect to login if we're NOT already on a login-related page.
            // This prevents a redirect loop where the admin dashboard fires a 401
            // (e.g. stale/expired token) and immediately bounces back to login,
            // making it appear as if login itself is stuck.
            if (typeof window !== 'undefined') {
                const isOnLoginPage = window.location.pathname.startsWith('/login');
                if (!isOnLoginPage) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                    window.location.href = '/login/login_page';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
