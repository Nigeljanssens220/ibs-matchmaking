import { Resume } from '@/types/database'
import { fetcher } from '@/utils/fetch'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import CustomListItem from './ListItem'

// interface ItemListProps {
//     data: any[]
// }

const ItemList: React.FC = () => {
    const { data: session, status } = useSession()
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

    return (
        <ul className="bg-gray-700 rounded-md max-w-screen-xl">
            {resumes.map((resume: Resume) => {
                return <CustomListItem data={resume} key={resume.id} />
            })}
        </ul>
    )
}

export default ItemList
