import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', formData, {
        withCredentials: true
      });

      if (response.data.success) {
        setAuth(true);
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ setAuth }) => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         try {
//             const response = await axios.post(`http://localhost:4000/api/auth/login`, formData, { withCredentials: true });

//             if (response.data.success) {
//                 localStorage.setItem('isAuthenticated', 'true');
//                 setAuth(true);
//                 navigate('/dashboard', { replace: true });
//             } else {
//                 setError(response.data.message);
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Server error. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="auth-container">
//             <form onSubmit={handleSubmit} className="auth-form">
//                 <input type="email" name="email" onChange={handleChange} required placeholder="Email" />
//                 <input type="password" name="password" onChange={handleChange} required placeholder="Password" />
//                 <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
//                 {error && <p className="error-message">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default Login;