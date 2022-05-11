//@ts-nocheck
import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'

export default withAuth(
    function middleware(req: NextRequest & { nextauth: { token: JWT } }) {
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized({ req, token }) {
                if (token) return true // If there is a token, the user is authenticated
            },
        },
    }
)
