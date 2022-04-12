import NextAuth from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    debug: true,
    // callbacks: {
    //     async jwt({ token, account }) {
    //         // Persist the OAuth access_token to the token right after signin
    //         if (account) {
    //             token.accessToken = account.access_token
    //         }
    //         return token
    //     },
    //     async session({ session, token, user }) {
    //         // Send properties to the client, like an access_token from a provider.
    //         session.accessToken = token.accessToken
    //         return session
    //     },
    // },
})
