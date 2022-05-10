import { useUploadForm } from '@/utils/hooks'
import { FolderAddIcon } from '@heroicons/react/outline'
import { TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSWRConfig } from 'swr'
import Spinner from '../Animations/Loading/Spinner'

interface FileUploadProps {
    matchmaking: boolean
    file: File | null
    description: string
}

const Dropbox: React.FC = ({}) => {
    const { data: session, status } = useSession()
    const [formValues, setFormValues] = useState<FileUploadProps>({
        matchmaking: true,
        description: '',
        file: null,
    })
    const [submitting, setSubmitting] = useState(true)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [description, setDescription] = useState('')
    const { mutate } = useSWRConfig()

    const { isSuccess, uploadForm, progress } = useUploadForm(
        'https://ibs-matchmaking-api.azurewebsites.net/createItem'
    )

    const hasSubmitted = (formValues: { file: any }, submitting: boolean) => {
        if (formValues.file && submitting) {
            return false
        }
        return true
    }

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
        let formData = new FormData()
        formData.append('description', description)
        formData.append('matchmaking', formValues.matchmaking.toString())
        formValues.file && formData.append('file', formValues.file)

        await uploadForm(formData)

        setFormValues({ file: null, matchmaking: true, description: '' })
        setSubmitting(true)
        setUploadProgress(0)

        // update existing data in cache with newly uploaded resume
        mutate(
            status !== 'authenticated'
                ? null
                : [
                      'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                      session!.accessToken,
                  ]
        )
    }

    useEffect(() => {
        if (progress) setUploadProgress(progress)
        return () => setUploadProgress(0)
    }, [progress])

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
                    if (e.key === 'Enter') handleSubmit()
                }}
                onChange={(e) => {
                    setDescription(e.target.value)
                    // setFormValues((prevFormValues) => ({
                    //     ...prevFormValues,
                    //     description: e.target.value,
                    // }))
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
                onClick={handleSubmit}
                className="flex items-center justify-center w-full max-w-md rounded-md px-4 h-16 text-gray-100 bg-gray-700 hover:bg-gray-500"
            >
                {uploadProgress ? <Spinner className="w-8 h-8" /> : 'Submit'}
            </button>
        </>
    )
}

export default Dropbox
