import { auth } from "../../../../../auth"
import { NextResponse } from "next/server"
import { uploadToS3 } from "../../../../../lib/s3"
import { getCollection } from "../../../../../lib/mongodb"
import { ensureUserCollection } from "../../../../../lib/qdrant"
import { processDocument } from "../../../../../lib/langchain/rag"

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id || session.user.email

    // Parse form data
    const formData = await request.formData()
    const file = formData.get("file")
    const category = formData.get("category") || "general"
    const description = formData.get("description") || ""

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and DOCX files are allowed." },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      )
    }

    // Upload to S3
    const { key, url } = await uploadToS3(file, userId)

    // Save metadata to MongoDB
    const documents = await getCollection("documents")
    const document = {
      userId,
      filename: file.name,
      originalName: file.name,
      fileType: file.type,
      fileSize: file.size,
      s3Key: key,
      s3Url: url,
      uploadedAt: new Date(),
      metadata: {
        category,
        tags: [],
        description
      },
      processingStatus: "pending",
      qdrantDocumentId: null,
      textContent: null,
      chunkCount: 0
    }

    const result = await documents.insertOne(document)
    const documentId = result.insertedId.toString()

    // Process document asynchronously
    try {
      // Ensure user has a Qdrant collection
      const collectionName = await ensureUserCollection(userId)

      // Get file buffer
      const arrayBuffer = await file.arrayBuffer()
      const fileBuffer = Buffer.from(arrayBuffer)

      // Update status to processing
      await documents.updateOne(
        { _id: result.insertedId },
        { $set: { processingStatus: "processing" } }
      )

      // Process document and store embeddings
      const { chunkCount, textContent } = await processDocument(
        fileBuffer,
        documentId,
        collectionName
      )

      // Update document with processing results
      await documents.updateOne(
        { _id: result.insertedId },
        {
          $set: {
            processingStatus: "completed",
            qdrantDocumentId: documentId,
            chunkCount,
            textContent
          }
        }
      )

      return NextResponse.json({
        success: true,
        documentId,
        message: "Document uploaded and processed successfully",
        chunkCount
      })
    } catch (processingError) {
      console.error("Document processing error:", processingError)

      // Update status to failed
      await documents.updateOne(
        { _id: result.insertedId },
        {
          $set: {
            processingStatus: "failed",
            error: processingError.message
          }
        }
      )

      return NextResponse.json({
        success: false,
        documentId,
        error: "Document uploaded but processing failed",
        details: processingError.message
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    )
  }
}
