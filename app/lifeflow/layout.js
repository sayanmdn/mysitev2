import { auth } from "../../auth"
import { redirect } from "next/navigation"

export default async function LifeFlowLayout({ children }) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* LifeFlow Navigation */}
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        padding: '1rem 0',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <h2 style={{
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              LifeFlow AI
            </h2>
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.95rem'
            }}>
              <a
                href="/lifeflow"
                style={{
                  textDecoration: 'none',
                  color: '#333',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
              >
                Dashboard
              </a>
              <a
                href="/lifeflow/documents"
                style={{
                  textDecoration: 'none',
                  color: '#666',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
              >
                Documents
              </a>
              <a
                href="/lifeflow/chat"
                style={{
                  textDecoration: 'none',
                  color: '#666',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
              >
                AI Chat
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a
              href="/"
              style={{
                textDecoration: 'none',
                color: '#666',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Home
            </a>
            <a
              href="/projects"
              style={{
                textDecoration: 'none',
                color: '#666',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Projects
            </a>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              fontSize: '0.85rem',
              color: '#666'
            }}>
              <span>{session.user.name || session.user.email}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}
