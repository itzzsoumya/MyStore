import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          fontFamily: 'system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <h2>⚠️ Something went wrong</h2>
          <details style={{ marginTop: '1rem', textAlign: 'left', background: '#f5f5f5', padding: '1rem', borderRadius: '8px', maxWidth: '80%' }}>
            <summary>Error details (click to see)</summary>
            <pre style={{ fontSize: '0.8rem', overflow: 'auto' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              onClick={() => window.location.reload()} 
              style={{ padding: '0.5rem 1rem', background: '#ff6f00', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Reload Page
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              style={{ padding: '0.5rem 1rem', background: '#757575', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary