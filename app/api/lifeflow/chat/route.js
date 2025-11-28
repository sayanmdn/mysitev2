import { auth } from "../../../../auth"
import { NextResponse } from "next/server"
import { queryRAG } from "../../../../lib/langchain/rag"
import { ensureUserCollection } from "../../../../lib/qdrant"

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id || session.user.email

    // Parse request body
    const { question } = await request.json()

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      )
    }

    // Ensure user has a Qdrant collection
    const collectionName = await ensureUserCollection(userId)

    try {
      // Query RAG system
      const answer = await queryRAG(question, collectionName)

      return NextResponse.json({
        success: true,
        answer,
        question
      })
    } catch (ragError) {
      console.error("RAG query error:", ragError)

      // Check if it's a "no documents" error
      if (ragError.message.includes("not found") || ragError.message.includes("No such collection")) {
        return NextResponse.json({
          success: true,
          answer: "I don't have any documents to reference yet. Please upload some documents first, and I'll be able to answer questions about them!",
          question,
          noDocuments: true
        })
      }

      throw ragError
    }
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      {
        error: "Failed to process question",
        details: error.message
      },
      { status: 500 }
    )
  }
}
