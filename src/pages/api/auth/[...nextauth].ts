import { prisma } from '@/backend/utils/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID,
            authorization: {
                params: {
                    scope: process.env.AZURE_AD_SCOPE,
                },
            },
            // Custom profile that's returned from the Azure AD provider.
            // oid is used in backend to verify user.
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    oid: profile.oid,
                }
            },
        }),
        // ...add more providers here
    ],
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        // maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 60 * 60, // 1 hour
    },
    pages: {
        signIn: '/login',
    },
    debug: true,
    callbacks: {
        async jwt({ token, account, user, profile }) {
            // Persist the OAuth access_token to the token right after signin
            if (account && user) {
                token.accessToken = account.access_token
                // token.refreshToken = account.refresh_token
                token.oid = profile!.oid
                token.expiresAt =
                    account.expires_at && new Date(account.expires_at * 1000)
            }
            return token
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            // session.refreshToken = token.refreshToken
            session.accessTokenExpiresAt = token.expiresAt
            session.oid = token.oid
            return session
        },
    },
})
