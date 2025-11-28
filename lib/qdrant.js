import { QdrantClient } from "@qdrant/js-client-rest"

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
})

/**
 * Ensure a user-specific Qdrant collection exists
 * Creates the collection if it doesn't exist
 * @param {string} userId - The user ID
 * @returns {Promise<string>} The collection name
 */
export async function ensureUserCollection(userId) {
  // Sanitize userId for collection name (replace special chars)
  const collectionName = `user_${userId.replace(/[@.]/g, '_')}`

  try {
    // Try to get the collection
    await qdrantClient.getCollection(collectionName)
  } catch (error) {
    // Collection doesn't exist, create it
    await qdrantClient.createCollection(collectionName, {
      vectors: {
        size: 1536, // OpenAI text-embedding-3-small dimension
        distance: "Cosine",
      },
    })
  }

  return collectionName
}

/**
 * Delete all vectors for a specific document from Qdrant
 * @param {string} collectionName - The collection name
 * @param {string} documentId - The document ID
 * @returns {Promise<void>}
 */
export async function deleteDocumentVectors(collectionName, documentId) {
  await qdrantClient.delete(collectionName, {
    filter: {
      must: [{ key: "documentId", match: { value: documentId } }],
    },
  })
}

/**
 * Search for similar vectors in a collection
 * @param {string} collectionName - The collection name
 * @param {number[]} queryVector - The query embedding vector
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} Search results
 */
export async function searchVectors(collectionName, queryVector, limit = 5) {
  const result = await qdrantClient.search(collectionName, {
    vector: queryVector,
    limit,
    with_payload: true,
  })
  return result
}

export { qdrantClient }
