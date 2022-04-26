import { FC } from 'react'

interface TableProps {
    items: Project[]
    headers: string[]
}

const Table: FC<TableProps> = ({ items, headers }) => {
    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-200">
                        Projects
                    </h1>
                    <p className="mt-2 text-sm text-gray-300">
                        A list of all the users in your account including their
                        name, title, email and role.
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-700">
                                    <tr>
                                        {headers.map((header: string) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-white sm:pl-3"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200 ">
                                    {items.map((item, itemIdx) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                itemIdx % 2 === 0
                                                    ? 'bg-gray-400/50'
                                                    : ''
                                            }
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 border border-black">
                                                {item.job_title}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 border border-black">
                                                {item.source}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 border border-black">
                                                {item.employer}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 border border-black ">
                                                {item.weekly_hours}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 border border-black">
                                                <a
                                                    href={item.job_url}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    View
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table
