import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant"
import { RetrievalQAChain } from "langchain/chains"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { writeFile, unlink } from "fs/promises"
import { v4 as uuidv4 } from "uuid"

// Initialize embeddings model (using OpenRouter's text-embedding-3-small)
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "openai/text-embedding-3-small",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  }
})

// Initialize LLM (using DeepSeek R1T2 Chimera via OpenRouter)
const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "google/gemini-2.0-flash-exp:free",
  temperature: 0.7,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  }
})

/**
 * Process a PDF document and store embeddings in Qdrant
 * @param {Buffer} fileBuffer - The PDF file buffer
 * @param {string} documentId - Unique document ID
 * @param {string} collectionName - Qdrant collection name
 * @returns {Promise<{chunkCount: number, textContent: string}>}
 */
export async function processDocument(fileBuffer, documentId, collectionName) {
  let tempPath = null

  try {
    // Save buffer to temp file for PDFLoader
    const tempFilename = `${uuidv4()}.pdf`
    tempPath = `/tmp/${tempFilename}`
    await writeFile(tempPath, fileBuffer)

    // Load document
    const loader = new PDFLoader(tempPath)
    const docs = await loader.load()

    // Extract text content for storage
    const textContent = docs.map(doc => doc.pageContent).join('\n').slice(0, 5000)

    // Split into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })
    const splitDocs = await textSplitter.splitDocuments(docs)

    // Add metadata to each chunk
    splitDocs.forEach((doc, idx) => {
      doc.metadata.documentId = documentId
      doc.metadata.chunkIndex = idx
    })

    // Store in Qdrant
    await QdrantVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName,
      }
    )

    return {
      chunkCount: splitDocs.length,
      textContent
    }
  } catch (error) {
    console.error("Error processing document:", error)
    throw new Error(`Failed to process document: ${error.message}`)
  } finally {
    // Cleanup temp file
    if (tempPath) {
      try {
        await unlink(tempPath)
      } catch (err) {
        console.error("Error deleting temp file:", err)
      }
    }
  }
}

/**
 * Query documents using RAG (Retrieval-Augmented Generation)
 * @param {string} question - The user's question
 * @param {string} collectionName - Qdrant collection name
 * @returns {Promise<string>} AI-generated answer
 */
export async function queryRAG(question, collectionName) {
  try {
    // Initialize vector store from existing collection
    const vectorStoreStart = Date.now()
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName,
      }
    )
    const vectorStoreTime = Date.now() - vectorStoreStart
    console.log(`[RAG] Vector store initialized in ${vectorStoreTime}ms`)

    // Create retrieval chain
    const chain = RetrievalQAChain.fromLLM(
      llm,
      vectorStore.asRetriever({
        k: 5, // Retrieve top 5 most relevant chunks
      })
    )

    // Query the chain
    const llmStart = Date.now()
    console.log(`[RAG] Starting LLM query...`)
    const response = await chain.call({ query: question })
    const llmTime = Date.now() - llmStart
    console.log(`[RAG] LLM response generated in ${llmTime}ms (${(llmTime / 1000).toFixed(2)}s)`)

    return response.text
  } catch (error) {
    console.error("Error querying RAG:", error)
    throw new Error(`Failed to query documents: ${error.message}`)
  }
}

/**
 * Get relevant document chunks for a query (without LLM generation)
 * @param {string} query - The search query
 * @param {string} collectionName - Qdrant collection name
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} Relevant document chunks
 */
export async function getRelevantChunks(query, collectionName, limit = 5) {
  try {
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName,
      }
    )

    const results = await vectorStore.similaritySearch(query, limit)
    return results.map(doc => ({
      content: doc.pageContent,
      metadata: doc.metadata
    }))
  } catch (error) {
    console.error("Error getting relevant chunks:", error)
    throw new Error(`Failed to retrieve chunks: ${error.message}`)
  }
}
