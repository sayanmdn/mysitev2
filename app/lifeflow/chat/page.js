import ChatInterface from "../../../components/lifeflow/ChatInterface"

export default function ChatPage() {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 2rem 4rem'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          AI Chat Assistant
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          margin: 0
        }}>
          Ask questions about your uploaded documents and get AI-powered insights
        </p>
      </div>

      {/* Chat Interface */}
      <ChatInterface />

      {/* Tips Section */}
      <div style={{
        marginTop: '2rem',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#333',
          marginBottom: '1rem'
        }}>
          💡 Tips for Better Answers
        </h3>
        <ul style={{
          margin: 0,
          paddingLeft: '1.5rem',
          color: '#666',
          fontSize: '0.9rem',
          lineHeight: '1.8'
        }}>
          <li>Be specific in your questions</li>
          <li>Reference document content when asking follow-up questions</li>
          <li>Upload multiple related documents for comprehensive insights</li>
          <li>Ask for summaries, key points, or specific details</li>
          <li>Request comparisons between different documents</li>
        </ul>
      </div>
    </div>
  )
}
