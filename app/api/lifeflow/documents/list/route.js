import { auth } from "../../../../../auth"
import { NextResponse } from "next/server"
import { getCollection } from "../../../../../lib/mongodb"

export async function GET(request) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id || session.user.email

    // Get documents collection
    const documents = await getCollection("documents")

    // Find all documents for this user, sorted by upload date (newest first)
    const userDocuments = await documents
      .find({ userId })
      .sort({ uploadedAt: -1 })
      .toArray()

    // Format response
    const formattedDocs = userDocuments.map(doc => ({
      id: doc._id.toString(),
      filename: doc.filename,
      originalName: doc.originalName,
      fileType: doc.fileType,
      fileSize: doc.fileSize,
      uploadedAt: doc.uploadedAt,
      category: doc.metadata?.category || "general",
      description: doc.metadata?.description || "",
      tags: doc.metadata?.tags || [],
      processingStatus: doc.processingStatus,
      chunkCount: doc.chunkCount || 0
    }))

    return NextResponse.json({
      success: true,
      documents: formattedDocs,
      total: formattedDocs.length
    })
  } catch (error) {
    console.error("Error listing documents:", error)
    return NextResponse.json(
      { error: "Failed to retrieve documents", details: error.message },
      { status: 500 }
    )
  }
}
