import DocumentUploader from "../../../../components/lifeflow/DocumentUploader"

export default function UploadPage() {
  return (
    <div style={{
      maxWidth: '800px',
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
          Upload Document
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666',
          margin: '0 0 1rem 0'
        }}>
          Add PDFs, medical prescriptions, CVs, or any document to your AI knowledge base
        </p>
        <a
          href="/lifeflow/documents"
          style={{
            fontSize: '0.9rem',
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          ← Back to Documents
        </a>
      </div>

      {/* Upload Form */}
      <DocumentUploader />

      {/* Help Section */}
      <div style={{
        marginTop: '3rem',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#333',
          marginBottom: '1rem'
        }}>
          How It Works
        </h2>
        <ol style={{
          color: '#666',
          fontSize: '0.95rem',
          lineHeight: '1.8',
          paddingLeft: '1.5rem',
          margin: 0
        }}>
          <li>
            <strong>Select your file:</strong> Choose a PDF or DOCX file (max 10MB)
          </li>
          <li>
            <strong>Choose a category:</strong> Helps organize your documents
          </li>
          <li>
            <strong>Add description:</strong> Optional context about the document
          </li>
          <li>
            <strong>Upload & Process:</strong> The AI will:
            <ul style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li>Upload the file to secure storage</li>
              <li>Extract text from your document</li>
              <li>Create embeddings for AI search</li>
              <li>Index it for fast retrieval</li>
            </ul>
          </li>
          <li>
            <strong>Chat with AI:</strong> Once processed, ask questions about your documents
          </li>
        </ol>
      </div>

      {/* Supported Documents */}
      <div style={{
        marginTop: '2rem',
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#333',
          marginBottom: '0.75rem'
        }}>
          Supported Documents
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>✓ Medical Records</div>
            <div style={{ fontSize: '0.85rem', color: '#999' }}>Prescriptions, test results</div>
          </div>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>✓ Personal Documents</div>
            <div style={{ fontSize: '0.85rem', color: '#999' }}>CVs, resumes, notes</div>
          </div>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>✓ Articles & Books</div>
            <div style={{ fontSize: '0.85rem', color: '#999' }}>PDFs, research papers</div>
          </div>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>✓ Guides & Manuals</div>
            <div style={{ fontSize: '0.85rem', color: '#999' }}>Productivity, health guides</div>
          </div>
        </div>
      </div>
    </div>
  )
}
