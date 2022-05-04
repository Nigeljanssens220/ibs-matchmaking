/* eslint-disable react/jsx-key */
//@ts-nocheck
import { Listbox, Transition } from '@headlessui/react'
import {
    CheckIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SelectorIcon,
    SortAscendingIcon,
    SortDescendingIcon,
} from '@heroicons/react/solid'
import { TextField } from '@mui/material'
import React from 'react'
import {
    useAsyncDebounce,
    useFilters,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table'
import PageButton from '../ButtonNew/PageButton'

const pageViewOptions = [5, 10, 15]

// UI for filtering
export const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}: {
    preGlobalFilteredRows: any
    globalFilter: any
    setGlobalFilter: any
}) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <label className="flex ">
            <TextField
                placeholder="e.g. Data Scientist"
                label="Search"
                variant="filled"
                className="bg-gray-700 w-full rounded-lg"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
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
        </label>
    )
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach((row) => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">{render('Header')}: </span>
            <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                value={filterValue}
                onChange={(e) => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    )
}

const TableNew = ({ columns, data }) => {
    const [selected, setSelected] = React.useState(pageViewOptions[1])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination // new
    )

    return (
        <div className="max-w-screen-xl space-y-4 ">
            <div className="sm:flex sm:gap-x-2">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                {headerGroups.map((headerGroup) =>
                    headerGroup.headers.map((column) =>
                        column.Filter ? (
                            <div className="mt-2 sm:mt-0" key={column.id}>
                                {column.render('Filter')}
                            </div>
                        ) : null
                    )
                )}
            </div>
            {/* Actual table */}
            <div className="flex flex-col max-w-screen-xl ">
                <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-300"
                            >
                                <thead className="bg-gray-700 ">
                                    {headerGroups.map((headerGroup, idx) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    // Add the sorting props to control sorting. For this example
                                                    // we can add them into the header props
                                                    <th
                                                        scope="col"
                                                        className="group py-3.5 pl-2 pr-3 sm:pl-3 text-left text-sm text-white font-medium tracking-wider"
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                    >
                                                        <div className="flex items-center pl-1 justify-between">
                                                            {column.render(
                                                                'Header'
                                                            )}
                                                            {/* Add a sort direction indicator */}
                                                            <span>
                                                                {column.isSorted ? (
                                                                    column.isSortedDesc ? (
                                                                        <SortDescendingIcon className="w-4 h-4 text-gray-200" />
                                                                    ) : (
                                                                        <SortAscendingIcon className="w-4 h-4 text-gray-200" />
                                                                    )
                                                                ) : (
                                                                    <SelectorIcon className="w-4 h-4 text-gray-200 opacity-0 group-hover:opacity-100" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-gray-100 text-left text-gray-900"
                                >
                                    {page.map((row, i) => {
                                        // new
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, idx) => {
                                                    if (idx !== 0) {
                                                        return (
                                                            <td
                                                                {...cell.getCellProps()}
                                                                className="p-4 "
                                                                role="cell"
                                                            >
                                                                {cell.column
                                                                    .Cell
                                                                    .name ===
                                                                'defaultRenderer' ? (
                                                                    <div className="text-sm text-gray-900">
                                                                        {cell.render(
                                                                            'Cell'
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    cell.render(
                                                                        'Cell'
                                                                    )
                                                                )}
                                                            </td>
                                                        )
                                                    }

                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="p-4 w-96 text-gray-900"
                                                            role="cell"
                                                        >
                                                            {cell.column.Cell
                                                                .name ===
                                                            'defaultRenderer' ? (
                                                                <div className="text-sm text-gray-900 ">
                                                                    {cell.render(
                                                                        'Cell'
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                cell.render(
                                                                    'Cell'
                                                                )
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="flex-1 flex items-center justify-between ">
                    <div className="flex gap-x-2 items-baseline">
                        <span className="text-sm text-gray-100">
                            Page{' '}
                            <span className="font-medium">
                                {state.pageIndex + 1}
                            </span>{' '}
                            of{' '}
                            <span className="font-medium">
                                {pageOptions.length}
                            </span>
                        </span>
                        <Listbox
                            value={selected}
                            onChange={(e) => {
                                setPageSize(Number(e))
                                setSelected(e)
                            }}
                            horizontal
                        >
                            <div className="relative px-4 ">
                                <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate text-gray-900">
                                        {state.pageSize}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <SelectorIcon
                                            className="h-5 w-5 text-gray-900"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    className="absolute mb-1 w-full rounded-md bg-white shadow-lg bottom-full"
                                >
                                    <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm z-100">
                                        {pageViewOptions.map(
                                            (pageSize, pageSizeIdx) => (
                                                <Listbox.Option
                                                    key={pageSizeIdx}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active
                                                                ? 'bg-gray-900 text-gray-100 rounded-md'
                                                                : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={pageSize}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${
                                                                    selected
                                                                        ? 'font-medium'
                                                                        : 'font-normal'
                                                                }`}
                                                            >
                                                                {pageSize}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                                                                    <CheckIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            )
                                        )}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div>
                        <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                        >
                            <PageButton
                                className="rounded-l-md disabled:bg-gray-200"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon
                                    className="h-5 w-5 text-gray-400 "
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                className="disabled:bg-gray-200"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                className="disabled:bg-gray-200"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                    className="h-5 w-5 text-gray-400 "
                                    aria-hidden="true"
                                />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md disabled:bg-gray-200"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TableNew
