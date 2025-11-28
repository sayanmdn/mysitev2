import { auth, signOut } from "../auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginBottom: '1rem'
            }}
          />
        )}
        <h1 style={{ marginBottom: '1rem' }}>Welcome to sayantanmishra.com</h1>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          Signed in as: <strong>{session.user?.email}</strong>
        </p>
        {session.user?.name && (
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Name: <strong>{session.user.name}</strong>
          </p>
        )}
        <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login" })
          }}
        >
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </form>
      </div>
    </main>
  )
}
