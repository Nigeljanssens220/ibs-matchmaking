import Sidebar from '@/components/Sidebar'
import { NextPage } from 'next'
import React from 'react'

type Props = {}

const Resumes: NextPage = () => {
    return (
        <div className="flex items-start justify-between">
            <Sidebar />
        </div>
    )
}

export default Resumes