import { useUploadForm } from '@/utils/hooks'
import { CircularProgress } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
interface FileUploadProps {
    matchmaking: boolean
    file: File | null
    description: string
}

const Dropbox: React.FC = () => {
    const [formValues, setFormValues] = useState<FileUploadProps>({
        matchmaking: true,
        description: 'test',
        file: null,
    })

    const { isSuccess, uploadForm, progress } = useUploadForm(
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
        let formData = new FormData()
        formData.append('description', formValues.description)
        formData.append('matchmaking', formValues.matchmaking.toString())
        formValues.file && formData.append('file', formValues.file)

        return await uploadForm(formData)
    }

    return (
        <>
            <div
                {...getRootProps({
                    className:
                        'items-center flex bg-gray-700 max-w-sm h-40 border-2 hover:border-gray-300 border-dashed rounded-lg p-20 text-center hover:border-gray-600 hover:text-gray-600 cursor-pointer',
                })}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop your file here.</p>
                ) : (
                    <p>Drag your file here, or click to select a file.</p>
                )}
            </div>
            <div className="flex gap-2">
                <strong>Files:</strong>
                <div>{formValues.file && formValues.file.name}</div>
            </div>
            {progress ? (
                <CircularProgress
                    size={24}
                    variant="determinate"
                    value={progress}
                />
            ) : (
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className=" rounded-md px-4 py-2 text-gray-100 bg-gray-700 hover:bg-gray-500"
                >
                    Submit
                </button>
            )}
        </>
    )
}

export default Dropbox
