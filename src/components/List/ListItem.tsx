import { Resume } from '@/types/database'
import { TrashIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Badge from '../Badge'
import Modal from '../Modal'
import PopOver from '../Popover'
import Typography from '../Typography'

interface CustomListItemProps {
    data: Resume
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const CustomListItem: React.FC<CustomListItemProps> = ({
    data,
    onClick,
    children,
}) => {
    const { data: session } = useSession()

    return (
        <div>
            <li className="flex flex-col md:flex-row w-full items-center text-center py-2 px-2 md:px-4 md:py-4 justify-between">
                <div className="flex  ">
                    <div className="flex-1 md:flex lg:w-96 whitespace-nowrap overflow-hidden py-2 md:py-0 md:text-left mr-2">
                        <Typography className="text-gray-100">
                            {data.id}
                        </Typography>
                    </div>

                    <Typography className="text-gray-100 hidden xl:block ">
                        {data.description || 'No description'}
                    </Typography>
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
                                <TrashIcon className="shrink-0 w-8 h-8 mx-2 hover:text-gray-400" />
                            }
                            onClick={onClick}
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
