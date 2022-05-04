//@ts-nocheck
import { Resume } from '@/types/database'
import { classNames } from '@/utils/styling'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Badge from '../Badge'

// const people = [
//     {
//         name: 'Lindsay Walton',
//         title: 'Front-end Developer',
//         email: 'lindsay.walton@example.com',
//         role: 'Member',
//     },
//     // More people...
// ]

interface ListProps {
    data: any[]
    headers: string[]
    keys?: string[]
}

const List: React.FC<ListProps> = ({ data, headers, keys }) => {
    const checkbox = useRef()
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [selectedData, setSelectedData] = useState<Resume[]>([])

    const initialHeader = headers.shift()

    useLayoutEffect(() => {
        const isIndeterminate =
            selectedData.length > 0 && selectedData.length < data.length
        setChecked(selectedData.length === data.length)
        setIndeterminate(isIndeterminate)
        //@ts-ignore
        checkbox.current.indeterminate = isIndeterminate
    }, [selectedData])

    const toggleAll = () => {
        setSelectedData(checked || indeterminate ? [] : data)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    // }
    return (
        <div className="hidden mt-8 xl:flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        {selectedData.length > 0 && (
                            <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    Bulk edit
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    Delete all
                                </button>
                            </div>
                        )}
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="relative w-12 px-6 sm:w-16 sm:px-8"
                                    >
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                            ref={checkbox}
                                            checked={checked}
                                            onChange={toggleAll}
                                        />
                                    </th>
                                    <th
                                        scope="col"
                                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        File
                                    </th>
                                    {headers &&
                                        headers.map((header, index) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            selectedData.includes(item)
                                                ? 'bg-gray-50'
                                                : undefined
                                        }
                                    >
                                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                            {selectedData.includes(item) && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                            )}
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                                                value={item.id}
                                                checked={selectedData.includes(
                                                    item
                                                )}
                                                onChange={(e) =>
                                                    setSelectedData(
                                                        e.target.checked
                                                            ? [
                                                                  ...selectedData,
                                                                  item,
                                                              ]
                                                            : selectedData.filter(
                                                                  (i) =>
                                                                      i !== item
                                                              )
                                                    )
                                                }
                                            />
                                        </td>
                                        <td
                                            className={classNames(
                                                'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                                selectedData.includes(item)
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-900'
                                            )}
                                        >
                                            {item.id}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {item.description}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {item.keywords_count}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            {item.matchmaking ? (
                                                <Badge variant="active">
                                                    active
                                                </Badge>
                                            ) : (
                                                <Badge variant="warning">
                                                    idle
                                                </Badge>
                                            )}
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

export default List
