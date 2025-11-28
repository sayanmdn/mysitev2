import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

/**
 * Upload a file to S3
 * @param {File} file - The file to upload
 * @param {string} userId - The user ID for folder organization
 * @returns {Promise<{key: string, url: string}>} S3 key and URL
 */
export async function uploadToS3(file, userId) {
  const key = `lifeflow/${userId}/${Date.now()}-${file.name}`
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  })

  await s3Client.send(command)

  return {
    key,
    url: `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`
  }
}

/**
 * Get a signed URL for downloading a file from S3
 * @param {string} key - The S3 object key
 * @returns {Promise<string>} Signed URL valid for 1 hour
 */
export async function getSignedDownloadUrl(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  })
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

/**
 * Delete a file from S3
 * @param {string} key - The S3 object key to delete
 * @returns {Promise<void>}
 */
export async function deleteFromS3(key) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  })
  await s3Client.send(command)
}

export { s3Client }
