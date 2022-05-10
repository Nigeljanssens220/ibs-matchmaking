import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export const useUploadForm = (url: string) => {
    const { data: session } = useSession()

    const [isSuccess, setIsSuccess] = useState(false)
    const [progress, setProgress] = useState(0)

    const uploadForm = async (formData: FormData) => {
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${session!.accessToken}`,
                },
                onUploadProgress: (progressEvent) => {
                    const progress =
                        25 + (progressEvent.loaded / progressEvent.total) * 25
                    setProgress(progress)
                },
                onDownloadProgress: (progressEvent) => {
                    const progress =
                        50 + (progressEvent.loaded / progressEvent.total) * 50
                    setProgress(progress)
                },
            })

            if (response.status === 200) {
                setIsSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { uploadForm, isSuccess, progress }
}
