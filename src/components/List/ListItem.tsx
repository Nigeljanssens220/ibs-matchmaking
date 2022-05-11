import { Resume } from '@/types/database'
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import Badge from '../Badge'
import InputTextField from '../Input/TextField'
// import InputTextField from '../Input/TextField'
import Modal from '../Modal'
import PopOver from '../Popover'
import Typography from '../Typography'

interface CustomListItemProps {
    data: Resume
    children?: React.ReactNode
    onClickDelete?: (event: React.MouseEvent<HTMLDivElement>) => void
    onClickEdit?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const CustomListItem: React.FC<CustomListItemProps> = ({ data }) => {
    const { data: session } = useSession()
    const { mutate } = useSWRConfig()
    const [resume, setResume] = useState<Resume>(data)
    const [description, setDescription] = useState(data.description)
    const [matchmaking, setMatchmaking] = useState(data.matchmaking)

    const isEdited =
        description !== resume.description || matchmaking !== resume.matchmaking

    const deleteHandler = async (item: Resume) => {
        // send request to backend to delete resume
        const response = await axios.post(
            'https://ibs-matchmaking-api.azurewebsites.net/deleteItem',
            { fileName: item.id },
            {
                headers: {
                    Authorization: `Bearer ${session!.accessToken}`,
                },
            }
        )
        // Call useWR to update the component with the latest data
        mutate(
            !session
                ? null
                : [
                      'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                      session!.accessToken,
                  ]
        )
    }

    const editHandler = async (item: Resume) => {
        if (!isEdited) return

        // send request to backend to update resume
        const response = await axios.post(
            'https://ibs-matchmaking-api.azurewebsites.net/updateItem',
            {
                fileName: item.id,
                description: description,
                matchmaking: item.matchmaking,
            },
            {
                headers: {
                    Authorization: `Bearer ${session!.accessToken}`,
                },
            }
        )
        // Call useWR to update the component with the latest data
        mutate(
            !session
                ? null
                : [
                      'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                      session!.accessToken,
                  ]
        )
    }

    return (
        <div>
            <li className="flex flex-col md:flex-row w-full items-center text-center py-2 px-2 md:px-4 md:py-4 justify-between">
                <div className="flex  ">
                    <div className="flex-1 md:flex md:w-60 lg:w-96 whitespace-nowrap overflow-hidden py-2 md:py-0 md:text-left mr-2">
                        <Typography className="text-gray-100">
                            {data.id}
                        </Typography>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center">
                        <Typography className="text-gray-100 hidden lg:inline ">
                            {data.description || 'No description'}
                        </Typography>
                        <Modal
                            className="hidden lg:inline"
                            buttonLabel="Save"
                            title="Edit description"
                            variant="base"
                            label={
                                <PencilIcon className="shrink-0 w-6 h-6 mx-2 hover:text-gray-400" />
                            }
                            onClick={() => {
                                setResume({
                                    ...resume,
                                    description: description,
                                })
                                editHandler(resume)
                            }}
                            onCancel={() => {
                                setResume(data)
                                setDescription(data.description)
                            }}
                            onKeyDown={(e) => {
                                setResume({
                                    ...resume,
                                    description: description,
                                })
                                editHandler(resume)
                            }}
                        >
                            <InputTextField
                                className="bg-gray-100 text-gray-900 text-sm"
                                value={description}
                                placeholder={
                                    data.description || 'No description'
                                }
                                onChange={(e) => setDescription(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                        setDescription(data.description)
                                    }
                                }}
                            />
                        </Modal>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-evenly ">
                    {data.matchmaking ? (
                        <Badge variant="active">Active</Badge>
                    ) : (
                        <Badge variant="warning">Idle</Badge>
                    )}

                    <PopOver data={data}></PopOver>
                    <div className="cursor-pointer">
                        <Modal
                            buttonLabel="Delete"
                            title="Delete resume"
                            variant="error"
                            label={
                                <TrashIcon className="shrink-0 w-6 h-6 mx-2 hover:text-gray-400" />
                            }
                            onClick={() => deleteHandler(resume)}
                        >
                            <Typography>
                                Are you sure you want to delete this resume?
                                Deleting your resume means that you will not be
                                matched with future job openings.
                            </Typography>
                        </Modal>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default CustomListItem
