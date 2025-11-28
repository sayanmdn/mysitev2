import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  debug: true,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async signIn({ user, account, profile }) {
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
    async session({ session, user }) {
      return session
    },
  },
})
