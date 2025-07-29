function App() {
  return (
    <div style={{ 
      backgroundColor: '#f7fafc', 
      color: '#2d3748', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Test message to verify deployment */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: '#e53e3e',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        zIndex: 9999
      }}>
        DEPLOYMENT TEST - {new Date().toLocaleTimeString()}
      </div>
      
      {/* Simple test content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          🚀 Blokko DeFi Dashboard
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: '#4a5568', marginBottom: '30px' }}>
          Welcome back! Here's your portfolio overview and latest activity.
        </p>
        
        {/* Portfolio Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>Portfolio Value</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748' }}>$250,000</div>
            <div style={{ color: '#38a169', fontSize: '0.9rem' }}>↗ 12.5% from last month</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>Active Networks</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748' }}>4</div>
            <div style={{ color: '#38a169', fontSize: '0.9rem' }}>↗ 2 new this month</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>Active Positions</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748' }}>12</div>
            <div style={{ color: '#38a169', fontSize: '0.9rem' }}>↗ 3 new positions</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>Current APY</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>8.75%</div>
            <div style={{ color: '#38a169', fontSize: '0.9rem' }}>↗ 0.8% increase</div>
          </div>
        </div>
        
        {/* Success Message */}
        <div style={{
          backgroundColor: '#f0fff4',
          border: '2px solid #68d391',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '30px'
        }}>
          <h2 style={{ color: '#22543d', marginBottom: '10px' }}>✅ Dashboard Successfully Loaded!</h2>
          <p style={{ color: '#22543d', marginBottom: '15px' }}>
            The Blokko DeFi Dashboard is now fully functional on GitHub Pages. 
            All components are rendering correctly and the JavaScript is working properly.
          </p>
          <div style={{
            backgroundColor: '#c6f6d5',
            border: '2px solid #68d391',
            borderRadius: '6px',
            padding: '15px'
          }}>
            <p style={{ color: '#22543d', fontWeight: 'bold', margin: 0 }}>
              🎉 SUCCESS: The React application is rendering correctly on GitHub Pages!
            </p>
          </div>
        </div>
      </div>
      
      {/* Simple AI Chat Icon */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#38b2ac',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1000
      }}>
        <span style={{ color: 'white', fontSize: '24px' }}>💬</span>
      </div>
    </div>
  );
}

export default App;