"use client"

import { useState } from "react"

export default function DocumentCard({ document, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${document.filename}"?`)) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch(`/api/lifeflow/documents/${document.id}`, {
        method: "DELETE"
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete")
      }

      if (onDelete) {
        onDelete(document.id)
      }
    } catch (error) {
      alert(`Error deleting document: ${error.message}`)
      setDeleting(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#28a745"
      case "processing":
        return "#ffc107"
      case "pending":
        return "#6c757d"
      case "failed":
        return "#dc3545"
      default:
        return "#6c757d"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "✓ Processed"
      case "processing":
        return "⏳ Processing..."
      case "pending":
        return "⏸ Pending"
      case "failed":
        return "✗ Failed"
      default:
        return status
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "medical":
        return "⚕️"
      case "personal":
        return "👤"
      case "career":
        return "💼"
      case "health":
        return "💪"
      case "productivity":
        return "📈"
      default:
        return "📄"
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / 1024 / 1024).toFixed(1) + " MB"
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid #f0f0f0',
      transition: 'box-shadow 0.2s, transform 0.2s',
      opacity: deleting ? 0.5 : 1,
      pointerEvents: deleting ? 'none' : 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          <div style={{ fontSize: '2rem' }}>
            {getCategoryIcon(document.category)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              margin: 0,
              fontSize: '1rem',
              fontWeight: '600',
              color: '#333',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {document.filename}
            </h3>
            <div style={{
              fontSize: '0.8rem',
              color: '#999',
              marginTop: '0.25rem'
            }}>
              {formatFileSize(document.fileSize)} • {formatDate(document.uploadedAt)}
            </div>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            padding: '0.5rem',
            backgroundColor: 'transparent',
            color: '#dc3545',
            border: 'none',
            borderRadius: '6px',
            cursor: deleting ? 'not-allowed' : 'pointer',
            fontSize: '1.2rem',
            transition: 'background-color 0.2s'
          }}
          title="Delete document"
        >
          🗑️
        </button>
      </div>

      {/* Description */}
      {document.description && (
        <p style={{
          margin: '0 0 1rem 0',
          fontSize: '0.9rem',
          color: '#666',
          lineHeight: '1.5'
        }}>
          {document.description}
        </p>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid #f0f0f0'
      }}>
        {/* Category Badge */}
        <div style={{
          padding: '0.25rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          fontSize: '0.8rem',
          color: '#666',
          textTransform: 'capitalize'
        }}>
          {document.category}
        </div>

        {/* Status Badge */}
        <div style={{
          padding: '0.25rem 0.75rem',
          backgroundColor: getStatusColor(document.processingStatus) + '20',
          color: getStatusColor(document.processingStatus),
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: '500'
        }}>
          {getStatusText(document.processingStatus)}
        </div>
      </div>

      {/* Chunk Count (if processed) */}
      {document.processingStatus === "completed" && document.chunkCount > 0 && (
        <div style={{
          marginTop: '0.75rem',
          fontSize: '0.75rem',
          color: '#999',
          textAlign: 'right'
        }}>
          {document.chunkCount} chunks indexed
        </div>
      )}
    </div>
  )
}
