import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

/**
 * Get the MongoDB database instance
 * @returns {Promise<Db>} MongoDB database
 */
export async function getDatabase() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DATABASE || "sayantanmishra")
}

/**
 * Get a MongoDB collection
 * @param {string} collectionName - The collection name
 * @returns {Promise<Collection>} MongoDB collection
 */
export async function getCollection(collectionName) {
  const db = await getDatabase()
  return db.collection(collectionName)
}
