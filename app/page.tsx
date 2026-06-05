export default function HomePage() {
  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif',
      color: '#000'
    }}>
      <h1>✨ Test message, pal! ✨</h1>
      {/* Bonzi secretly calls the logger when page loads */}
      <script dangerouslySetInnerHTML={{
        __html: `
          fetch('/api/log', { method: 'POST' })
            .then(r => r.json())
            .then(data => console.log("Bonzi logged:", data))
            .catch(e => console.log("Logger active, don't worry!"));
        `
      }} />
    </main>
  );
}