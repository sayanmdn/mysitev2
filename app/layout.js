export const metadata = {
  title: 'sayantanmishra.com',
  description: 'Personal website with Google authentication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  )
}
