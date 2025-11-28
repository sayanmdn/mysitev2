"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DocumentUploader() {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState("general")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file")
      return
    }

    setUploading(true)
    setError(null)
    setProgress("Uploading file...")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", category)
      formData.append("description", description)

      setProgress("Uploading to server...")
      const response = await fetch("/api/lifeflow/documents/upload", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      if (data.success) {
        setProgress("Processing complete!")
        setTimeout(() => {
          router.push("/lifeflow/documents")
        }, 1000)
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (err) {
      setError(err.message)
      setProgress(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#333',
        marginBottom: '1.5rem'
      }}>
        Upload Document
      </h2>

      {/* File Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: '#333'
        }}>
          Select File (PDF or DOCX, max 10MB)
        </label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            display: 'block',
            width: '100%',
            padding: '0.75rem',
            border: '2px dashed #ddd',
            borderRadius: '8px',
            fontSize: '0.9rem',
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        />
        {file && (
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: '#666'
          }}>
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>

      {/* Category Select */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: '#333'
        }}>
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={uploading}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '0.9rem',
            backgroundColor: uploading ? '#f5f5f5' : 'white',
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        >
          <option value="general">General</option>
          <option value="medical">Medical</option>
          <option value="personal">Personal</option>
          <option value="career">Career</option>
          <option value="health">Health & Fitness</option>
          <option value="productivity">Productivity</option>
        </select>
      </div>

      {/* Description Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: '#333'
        }}>
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading}
          placeholder="Add a brief description of this document..."
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            backgroundColor: uploading ? '#f5f5f5' : 'white'
          }}
        />
      </div>

      {/* Progress Message */}
      {progress && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#e6f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '6px',
          color: '#0066cc',
          fontSize: '0.9rem',
          marginBottom: '1rem'
        }}>
          {progress}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#ffe6e6',
          border: '1px solid #ffb3b3',
          borderRadius: '6px',
          color: '#cc0000',
          fontSize: '0.9rem',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!file || uploading}
        style={{
          width: '100%',
          padding: '0.875rem',
          backgroundColor: (!file || uploading) ? '#ccc' : '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: (!file || uploading) ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {uploading ? "Processing..." : "Upload & Process Document"}
      </button>
    </form>
  )
}
