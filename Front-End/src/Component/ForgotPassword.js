import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('https://simple-auth-login-register-form.onrender.com/api/auth/send-reset-otp', { email });
      
      if (response.data.success) {
        setMessage('OTP has been sent to your email. Please check your inbox.');
        // Store email in session to use in reset password page
        sessionStorage.setItem('resetEmail', email);
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
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset OTP</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>

        {message && (
          <div className="auth-redirect">
            <Link to="/reset-password" className="auth-button secondary">
              Continue to Reset Password
            </Link>
          </div>
        )}

        <div className="auth-footer">
          <p>Remember your password? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};


export default ForgotPassword;
