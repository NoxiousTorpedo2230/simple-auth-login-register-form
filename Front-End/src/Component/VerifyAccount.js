import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Send OTP when component mounts
    sendOtp();
  }, []);

  const sendOtp = async () => {
    setSendingOtp(true);
    setError('');

    try {
      // Fixed endpoint to include full URL
      const response = await axios.post('https://simple-auth-login-register-form.onrender.com/api/auth/send-verify-otp', {}, { 
        withCredentials: true 
      });
      
      if (response.data.success) {
        setMessage('OTP has been sent to your email.');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('OTP send error:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('https://simple-auth-login-register-form.onrender.com/api/auth/verify-account', 
        { otp }, 
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setMessage('Account verified successfully!');
        // Set authentication status to true after verification
        localStorage.setItem('isAuthenticated', 'true');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Verify Your Account</h2>
          <p>Enter the OTP sent to your email</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Didn't receive the OTP?{' '}
            <button 
              onClick={sendOtp} 
              className="text-button" 
              disabled={sendingOtp}
            >
              {sendingOtp ? 'Sending...' : 'Resend OTP'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


export default VerifyAccount;
