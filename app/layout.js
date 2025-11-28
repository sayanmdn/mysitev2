export const metadata = {
  title: 'Sayantan Mishra - Senior Full-Stack Engineer & AI Developer',
  description: 'Senior Full-Stack Engineer with 5.6 years building scalable, production-grade systems. Specializing in AI implementation, LLM integration, and cloud architecture.',
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
