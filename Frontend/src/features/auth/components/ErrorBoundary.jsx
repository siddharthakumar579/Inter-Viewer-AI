import React from "react";
import "./errorBoundary.scss";

class ErrorBoundary extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <h1>Oops! Something went wrong.</h1>
          <p>
            We're sorry, but the application encountered an unexpected error.
            Please try refreshing or go back home.
          </p>
          <button
            className="return-btn"
            onClick={() => (window.location.href = "/")}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
