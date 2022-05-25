import { useUploadForm } from '@/utils/hooks'
import { FolderAddIcon } from '@heroicons/react/outline'
import { TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'

interface FileUploadProps {
    matchmaking: boolean
    file: File | null
    description: string
}

const Dropbox: React.FC = ({}) => {
    const { data: session } = useSession()
    const [formValues, setFormValues] = useState<FileUploadProps>({
        matchmaking: true,
        description: '',
        file: null,
    })
    const [description, setDescription] = useState('')
    const { mutate } = useSWRConfig()

    const { uploadForm } = useUploadForm(
        'https://ibs-matchmaking-api.azurewebsites.net/createItem'
    )

    const onDrop = useCallback((acceptedFile) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            file: acceptedFile ? acceptedFile[0] : null,
        }))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/msword': ['.doc', '.docx'],
            'application/pdf': ['.pdf'],
        },
    })

    const handleSubmit = async () => {
        if (!formValues.file)
            return toast.error('Please select a file.', { duration: 1500 })

        // Toast animation during submitting
        const notification = toast.loading(
            'Uploading...'
            // Custom styling if needed
            // {
            //     style: {
            //         border: '1px solid #713200',
            //         padding: '16px',
            //         color: '#713200',
            //     },
            //     iconTheme: {
            //         primary: '#713200',
            //         secondary: '#FFFAEE',
            //     },
            // }
        )

        let formData = new FormData()
        formData.append('description', description)
        formData.append('matchmaking', formValues.matchmaking.toString())
        formValues.file && formData.append('file', formValues.file)

        await uploadForm(formData)

        setFormValues({ file: null, matchmaking: true, description: '' })

        // update existing data in cache with newly uploaded resume
        mutate(
            session
                ? [
                      'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                      session!.accessToken,
                  ]
                : null
        )

        toast.success('Successfully submitted!', {
            id: notification,
        })
    }

    return (
        <>
            <div
                {...getRootProps({
                    className:
                        'items-center flex flex-col bg-gray-700 max-w-md py-10 gap-5 border-2 hover:border-gray-300 border-dashed rounded-lg p-20 text-center hover:border-gray-600 hover:text-gray-600 cursor-pointer',
                })}
            >
                <input {...getInputProps()} />
                <FolderAddIcon className="w-12 h-12" />
                {isDragActive ? (
                    <p>Drop your file here.</p>
                ) : (
                    <p className="xs:block">
                        Drag your file here, or click to select a file.
                    </p>
                )}
            </div>
            <div className="flex gap-2">
                <strong>Files:</strong>
                <div>{formValues.file && formValues.file.name}</div>
            </div>
            <TextField
                placeholder="e.g. my favorite resume"
                label="Description"
                variant="filled"
                className="bg-gray-700 max-w-md w-full rounded-lg"
                value={description}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit()
                        // setSubmitting(!submitting)
                    }
                }}
                onChange={(e) => {
                    setDescription(e.target.value)
                    setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        description: e.target.value,
                    }))
                }}
                InputLabelProps={{
                    shrink: true,
                    style: { color: 'white' },
                }}
                InputProps={{
                    disableUnderline: true,
                    style: { color: 'white' },
                }}
            />
            <button
                onClick={() => {
                    handleSubmit()
                    setDescription('')
                }}
                className="flex items-center justify-center w-full max-w-md rounded-md px-4 h-16 text-gray-100 bg-gray-700 hover:bg-gray-500"
            >
                Submit
            </button>
        </>
    )
}

export default Dropbox
