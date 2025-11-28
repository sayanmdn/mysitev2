import { auth } from "../../../../../auth"
import { NextResponse } from "next/server"
import { getCollection } from "../../../../../lib/mongodb"
import { deleteFromS3 } from "../../../../../lib/s3"
import { deleteDocumentVectors, ensureUserCollection } from "../../../../../lib/qdrant"
import { ObjectId } from "mongodb"

/**
 * GET a single document by ID
 */
export async function GET(request, { params }) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id || session.user.email
    const { documentId } = params

    // Validate ObjectId
    if (!ObjectId.isValid(documentId)) {
      return NextResponse.json({ error: "Invalid document ID" }, { status: 400 })
    }

    // Get document
    const documents = await getCollection("documents")
    const document = await documents.findOne({
      _id: new ObjectId(documentId),
      userId // Ensure user owns this document
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Format response
    return NextResponse.json({
      success: true,
      document: {
        id: document._id.toString(),
        filename: document.filename,
        originalName: document.originalName,
        fileType: document.fileType,
        fileSize: document.fileSize,
        s3Key: document.s3Key,
        s3Url: document.s3Url,
        uploadedAt: document.uploadedAt,
        category: document.metadata?.category || "general",
        description: document.metadata?.description || "",
        tags: document.metadata?.tags || [],
        processingStatus: document.processingStatus,
        chunkCount: document.chunkCount || 0,
        textContent: document.textContent
      }
    })
  } catch (error) {
    console.error("Error getting document:", error)
    return NextResponse.json(
      { error: "Failed to retrieve document", details: error.message },
      { status: 500 }
    )
  }
}

/**
 * DELETE a document (removes from S3, Qdrant, and MongoDB)
 */
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id || session.user.email
    const { documentId } = params

    // Validate ObjectId
    if (!ObjectId.isValid(documentId)) {
      return NextResponse.json({ error: "Invalid document ID" }, { status: 400 })
    }

    // Get document
    const documents = await getCollection("documents")
    const document = await documents.findOne({
      _id: new ObjectId(documentId),
      userId // Ensure user owns this document
    })

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    // Delete from S3
    try {
      await deleteFromS3(document.s3Key)
    } catch (s3Error) {
      console.error("Error deleting from S3:", s3Error)
      // Continue with deletion even if S3 fails
    }

    // Delete vectors from Qdrant
    try {
      const collectionName = await ensureUserCollection(userId)
      await deleteDocumentVectors(collectionName, documentId)
    } catch (qdrantError) {
      console.error("Error deleting from Qdrant:", qdrantError)
      // Continue with deletion even if Qdrant fails
    }

    // Delete from MongoDB
    await documents.deleteOne({ _id: new ObjectId(documentId) })

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting document:", error)
    return NextResponse.json(
      { error: "Failed to delete document", details: error.message },
      { status: 500 }
    )
  }
}
