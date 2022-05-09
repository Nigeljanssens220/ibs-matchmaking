import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'

const Profile: NextPage = () => {
    const { data: session } = useSession()
    return <div>Hello, there!</div>
}

export default Profile
