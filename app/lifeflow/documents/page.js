"use client"

import { useState, useEffect } from "react"
import DocumentCard from "../../../components/lifeflow/DocumentCard"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/lifeflow/documents/list")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to load documents")
      }

      setDocuments(data.documents || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId))
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem 4rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            My Documents
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            margin: 0
          }}>
            Manage your uploaded documents and AI knowledge base
          </p>
        </div>
        <a
          href="/lifeflow/documents/upload"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          + Upload Document
        </a>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: '#666'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            ⏳
          </div>
          <p>Loading documents...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={{
          backgroundColor: '#ffe6e6',
          border: '1px solid #ffb3b3',
          borderRadius: '8px',
          padding: '1.5rem',
          color: '#cc0000',
          textAlign: 'center'
        }}>
          <strong>Error:</strong> {error}
          <button
            onClick={fetchDocuments}
            style={{
              display: 'block',
              margin: '1rem auto 0',
              padding: '0.5rem 1rem',
              backgroundColor: '#cc0000',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && documents.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            📂
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            No documents yet
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '1.5rem',
            maxWidth: '500px',
            margin: '0 auto 1.5rem'
          }}>
            Upload your first document to start building your AI knowledge base. PDFs, medical prescriptions, CVs, and more.
          </p>
          <a
            href="/lifeflow/documents/upload"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              backgroundColor: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Upload Your First Document
          </a>
        </div>
      )}

      {/* Documents Grid */}
      {!loading && !error && documents.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Document Count */}
      {!loading && !error && documents.length > 0 && (
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#999'
        }}>
          Showing {documents.length} document{documents.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
