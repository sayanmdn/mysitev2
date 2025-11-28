import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async signIn() {
      return true
    },
    async redirect({ url, baseUrl }) {
      // After login, redirect to /projects
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/projects`
      }
      // Allow callback URLs on the same origin
      if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    },
  },
})
