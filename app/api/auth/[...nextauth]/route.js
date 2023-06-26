import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials
  
        if (username == 'admin' && password == 'admin1') {
          return { id: "1", name: username, email: password }
        } else {
          throw new Error('Invalid')
        }
      },
    })
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id
      return session
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt'
  },
  secret: 'kjdkdjiiji',
  NEXTAUTH_URL: 'http://localhost:3000'
})

export { handler as GET, handler as POST }