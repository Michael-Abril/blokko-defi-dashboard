import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '32px',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7fafc',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#e53e3e',
              marginBottom: '16px'
            }}>
              Something went wrong
            </h1>
            <p style={{ 
              color: '#4a5568', 
              marginBottom: '16px',
              fontSize: '1.1rem'
            }}>
              The application encountered an error. Please check the console for details.
            </p>
            {this.state.error && (
              <div style={{
                padding: '16px',
                backgroundColor: '#fed7d7',
                borderRadius: '8px',
                border: '1px solid #feb2b2',
                marginBottom: '16px',
                textAlign: 'left'
              }}>
                <p style={{ 
                  fontWeight: 'bold', 
                  color: '#c53030', 
                  marginBottom: '8px',
                  margin: '0 0 8px 0'
                }}>
                  Error Details:
                </p>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#c53030', 
                  fontFamily: 'monospace',
                  margin: 0
                }}>
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            <button
              style={{
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 