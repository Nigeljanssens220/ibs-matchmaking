import { ExternalLinkIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import NavLink from '../NavLink'

interface TableProps {
    items: any[]
    headers: string[]
    keys: string[]
    hrefKey: string
}

const Table: FC<TableProps> = ({ items, headers, keys, hrefKey }) => {
    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-700 ">
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
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-24"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-200 ">
                                {items.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className={
                                            idx % 2 === 0
                                                ? 'bg-gray-400/50'
                                                : ''
                                        }
                                    >
                                        {keys.map((key, idx) =>
                                            idx === 0 ? (
                                                <td
                                                    key={idx}
                                                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 "
                                                >
                                                    {item[key]}
                                                </td>
                                            ) : (
                                                <td
                                                    key={idx}
                                                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 "
                                                >
                                                    {item[key]}
                                                </td>
                                            )
                                        )}
                                        <td className="relative whitespace-nowrap py-4 px-3 text-sm font-medium ">
                                            <NavLink
                                                href={item[hrefKey]}
                                                blank
                                                className="flex text-gray-100 hover:text-gray-300 bg-gray-800  rounded items-center justify-evenly gap-2 px-3 py-1 "
                                            >
                                                <ExternalLinkIcon
                                                    width={20}
                                                    height={20}
                                                    className=""
                                                />
                                                View
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
