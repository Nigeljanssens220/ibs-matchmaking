//@ts-nocheck
import type { NextRequest } from 'next/server'
import type { JWT } from 'next-auth/jwt'

import { withAuth } from 'next-auth/middleware'

// export default withAuth({
//     callbacks: {
//         authorized({ token }) {
//             if (token) return true // If there is a token, the user is authenticated
//         },
//     },
// })

import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { NextRequest, NextResponse } from 'next/server'

const basePath = process.env.NEXTAUTH_URL

export async function middleware(req: NextRequest) {
    // token will exist if user is logged in
    const session = await getToken({ req })
    const { pathname } = req.nextUrl

    // console.log('Session is: ', session)
    // console.log('Pathname is: ' + pathname)
    // console.log('Base path is: ' + basePath)

    // 1. The token does not exist and the request is for the dashboard page
    //    Redirect to the login page
    if (!session && pathname.includes('/dashboard')) {
        return NextResponse.redirect(`${basePath}/login`)
    }
}
