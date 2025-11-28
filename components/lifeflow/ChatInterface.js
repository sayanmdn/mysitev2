"use client"

import { useState, useRef, useEffect } from "react"

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can answer questions about the documents you've uploaded. What would you like to know?"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch("/api/lifeflow/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userMessage })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      // Add AI response to chat
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.answer,
        noDocuments: data.noDocuments
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}`,
        error: true
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 200px)',
      maxHeight: '800px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    }}>
      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: message.role === "user" ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: message.role === "user"
                ? '#667eea'
                : message.error
                  ? '#ffe6e6'
                  : '#f8f9fa',
              color: message.role === "user"
                ? 'white'
                : message.error
                  ? '#cc0000'
                  : '#333',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {message.role === "assistant" && (
                <div style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  🤖
                </div>
              )}
              {message.content}
              {message.noDocuments && (
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #ddd'
                }}>
                  <a
                    href="/lifeflow/documents/upload"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}
                  >
                    → Upload your first document
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: '#f8f9fa',
              color: '#666',
              fontSize: '0.95rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🤖</span>
                <span>Thinking...</span>
                <span style={{
                  display: 'inline-block',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>●●●</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '1.5rem',
          borderTop: '1px solid #f0f0f0',
          backgroundColor: '#fafafa'
        }}
      >
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-end'
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            placeholder="Ask a question about your documents..."
            disabled={loading}
            rows={1}
            style={{
              flex: 1,
              padding: '0.875rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              resize: 'none',
              minHeight: '48px',
              maxHeight: '120px',
              backgroundColor: loading ? '#f5f5f5' : 'white',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            style={{
              padding: '0.875rem 1.75rem',
              backgroundColor: (!input.trim() || loading) ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.8rem',
          color: '#999'
        }}>
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
