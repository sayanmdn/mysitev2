import { auth, signOut } from "../../auth"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <main style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Header */}
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
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>SM</h2>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="/" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>Home</a>
              <a href="/projects" style={{ textDecoration: 'none', color: '#667eea', fontWeight: '600' }}>Projects</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              />
            )}
            <span style={{ fontSize: '0.9rem', color: '#666' }}>{session.user?.name || session.user?.email}</span>
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#333'
          }}>
            Welcome back, {session.user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '2rem'
          }}>
            Manage your projects and portfolio content here.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {/* Project Management Cards */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '2px dashed #ddd',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              📁
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              Your Projects
            </h3>
            <p style={{
              color: '#999',
              fontSize: '1rem'
            }}>
              Add and manage your portfolio projects
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '2px dashed #ddd',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              ⚙️
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              Settings
            </h3>
            <p style={{
              color: '#999',
              fontSize: '1rem'
            }}>
              Configure your portfolio preferences
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '2px dashed #ddd',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              📊
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              Analytics
            </h3>
            <p style={{
              color: '#999',
              fontSize: '1rem'
            }}>
              View your portfolio statistics
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
