import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPass: '',
    confirmNewPass: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem('resetEmail');
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.newPass !== formData.confirmNewPass) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/reset-password', {
        email: formData.email,
        otp: formData.otp,
        newPass: formData.newPass
      });

      if (response.data.success) {
        setMessage('Password reset successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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
          <h2>Reset Password</h2>
          <p>Enter the OTP sent to your email and create a new password</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

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
              readOnly={!!sessionStorage.getItem('resetEmail')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              placeholder="Enter OTP received in email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPass">New Password</label>
            <input
              type="password"
              id="newPass"
              name="newPass"
              value={formData.newPass}
              onChange={handleChange}
              required
              placeholder="Create new password"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmNewPass">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPass"
              name="confirmNewPass"
              value={formData.confirmNewPass}
              onChange={handleChange}
              required
              placeholder="Confirm new password"
              minLength="6"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Remember your password? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;