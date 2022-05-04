import Modal from '@/components/Modal'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const Profile: NextPage = () => {
    const { data: session } = useSession()
    const [isShowing, setIsShowing] = useState(false)
    return (
        <div>
            <Modal title="fadsfas"> test</Modal>
        </div>
    )
}

export default Profile
