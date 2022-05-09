import { Resume } from '@/types/database'
import { fetcher } from '@/utils/fetch'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import CustomListItem from './ListItem'

// interface ItemListProps {
//     data: any[]
// }

const ItemList: React.FC = () => {
    const { data: session, status } = useSession()
    const [checked, setChecked] = useState([0])

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const [resumes, setResumes] = useState<Resume[]>([])

    const { data, mutate } = useSWRImmutable(
        status !== 'authenticated'
            ? null
            : [
                  'https://ibs-matchmaking-api.azurewebsites.net/readItems',
                  session!.accessToken,
              ],
        fetcher
    )

    useEffect(() => {
        if (data) {
            console.log(data.items)
            const resumes: Resume[] = data.items.map((resume: Resume) => {
                return {
                    ...resume,
                    fileName: resume.id.split('.')[0],
                    dateUploaded: new Date(
                        resume._ts * 1000
                    ).toLocaleDateString(),
                }
            })
            setResumes(resumes)
            return () => {
                setResumes([])
            }
        }
    }, [data])

    const deleteHandler = async (fileName: string) => {
        // send request to backend to delete resume
        const response = await axios.post(
            'https://ibs-matchmaking-api.azurewebsites.net/deleteItem',
            { fileName: fileName },
            {
                headers: {
                    Authorization: `Bearer ${session!.accessToken}`,
                },
            }
        )
        // Call useWR to update the component with the latest data
        mutate()
    }

    return (
        <ul className="bg-gray-700 rounded-md max-w-screen-xl">
            {resumes.map((resume: Resume) => {
                return (
                    <CustomListItem
                        data={resume}
                        key={resume.id}
                        onClick={() => deleteHandler(resume.id)}
                    />
                )
            })}
        </ul>
    )
}

export default ItemList
