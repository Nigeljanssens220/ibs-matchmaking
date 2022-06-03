import { isTokenValid, refreshAccessToken } from '@/utils/accessToken'
import NextAuth, { User } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

export default NextAuth({
    // adapter: PrismaAdapter(prisma),
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
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
    },
    debug: true,
    callbacks: {
        //@ts-ignore
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpiresAt:
                        account.expires_at &&
                        new Date(account.expires_at * 1000),
                    user,
                }
            }

            // Return previous token if the access token has not expired yet
            if (isTokenValid(new Date(token.accessTokenExpiresAt!))) {
                console.log(
                    'Access token is still valid. Returning previous token.'
                )
                return token
            }

            // Refresh the access token
            console.log('Access token has expired, refreshing')
            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token.user as User
            session.accessToken = token.accessToken
            session.accessTokenExpiresAt = token.accessTokenExpiresAt
            session.error = token.error

            return session
        },
    },
})
