import React from 'react'
import './auth.form.scss';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin, handleLogout, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ── Auto-logout: if an authenticated user lands on /login, log them out
  useEffect(() => {
    if (!loading && user && !isSubmitting) {
      handleLogout();
    }
  }, [loading, user, isSubmitting]);

  // ── Auto-redirect: navigate to home once login succeeds
  useEffect(() => {
    if (user && isSubmitting) {
      navigate('/');
    }
  }, [user, isSubmitting, navigate]);

  if (loading && !isSubmitting) {
    return <div className="auth-loading">Checking session...</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try{
      await handleLogin({ email, password });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setIsSubmitting(false); // Reset the button!
    }
    
  }

  return (
    <div className="auth-page">

      {/* Decorative background orbs */}
      <div className="auth-page__orb auth-page__orb--top" />
      <div className="auth-page__orb auth-page__orb--bottom" />

      {/* Main card */}
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <span className="auth-header__badge">Inter-Viewer AI</span>
          <h1>Welcome back</h1>
          <p>Sign in to access your interview plans and reports.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              name="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>

        </form>

        <div className="auth-divider" />

        {/* Footer */}
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

      </div>
    </div>
  );
}

export default Login
