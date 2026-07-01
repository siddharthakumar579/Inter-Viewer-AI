import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import './auth.form.scss';

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister, handleLogout, user } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Auto-logout: if an authenticated user lands on /register, log them out
  useEffect(() => {
    if (!loading && user && !isSubmitting) {
      handleLogout();
    }
  }, [loading, user, isSubmitting]);

  // ── Auto-redirect: navigate to home once registration succeeds
  useEffect(() => {
    if (user && isSubmitting) {
      navigate('/');
    }
  }, [user, isSubmitting, navigate]);

  if (loading && !isSubmitting) {
    return <div className="auth-loading">Checking session...</div>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    handleRegister({ username, email, password });
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
          <span className="auth-header__badge">InterviewAI</span>
          <h1>Create your account</h1>
          <p>Join thousands of candidates preparing smarter with AI.</p>
        </div>

        {/* Form — no logic changes, only class names updated */}
        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              type="text"
              placeholder="yourname"
              name="username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="••••••••"
              name="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account…' : 'Create Account'}
          </button>

        </form>

        <div className="auth-divider" />

        {/* Footer */}
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
}

export default Register
