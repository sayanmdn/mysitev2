import { auth } from "../../auth"

export default async function LifeFlowDashboard() {
  const session = await auth()

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem 4rem'
    }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Welcome to LifeFlow AI
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '2rem'
        }}>
          Your personalized AI-powered lifestyle coach. Upload documents, chat with AI, and optimize your daily routine.
        </p>
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* Documents Card */}
        <a href="/lifeflow/documents" style={{
          textDecoration: 'none',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            📄
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            Documents
          </h3>
          <p style={{
            color: '#666',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            Upload PDFs, articles, medical prescriptions, and personal documents. AI will analyze and learn from them.
          </p>
          <div style={{
            marginTop: '1rem',
            color: '#667eea',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Manage Documents →
          </div>
        </a>

        {/* AI Chat Card */}
        <a href="/lifeflow/chat" style={{
          textDecoration: 'none',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            💬
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            AI Chat
          </h3>
          <p style={{
            color: '#666',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            Chat with AI powered by GPT-4. Ask questions about your documents and get personalized insights.
          </p>
          <div style={{
            marginTop: '1rem',
            color: '#667eea',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Start Chatting →
          </div>
        </a>

        {/* Coming Soon Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          opacity: 0.7
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            🚀
          </div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            More Features Coming Soon
          </h3>
          <p style={{
            color: '#666',
            fontSize: '0.95rem',
            lineHeight: '1.6'
          }}>
            Daily timeline generator, habit tracking, and AI-powered recommendations are in development.
          </p>
        </div>
      </div>

      {/* Getting Started */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Getting Started
        </h2>
        <ol style={{
          color: '#666',
          fontSize: '0.95rem',
          lineHeight: '1.8',
          paddingLeft: '1.5rem'
        }}>
          <li>Upload your first document (PDF, medical prescription, CV, etc.)</li>
          <li>Wait for the AI to process and analyze your document</li>
          <li>Start chatting with the AI to get personalized insights</li>
          <li>Ask questions about your documents and get AI-powered answers</li>
        </ol>
        <a
          href="/lifeflow/documents/upload"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 2rem',
            backgroundColor: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          Upload Your First Document
        </a>
      </div>
    </div>
  )
}
