import SecondaryActionModal from '@/components/Modal/SecondaryActionModal'
import NavLink from '@/components/NavLink'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import parse from 'html-react-parser'

export const projectColumns = [
    {
        Header: 'Role',
        accessor: 'job_title',
        Cell: ({ cell: { value }, row: { original } }) => (
            <div className="flex text-left">
                <SecondaryActionModal
                    className=" "
                    title={value}
                    label={value}
                    buttonLabel="Share"
                    secondaryButtonLabel="Share"
                    variant="base"
                >
                    {parse(original.job_description_html)}
                </SecondaryActionModal>
            </div>
        ),
    },
    {
        Header: 'Match',
        accessor: 'match',
    },
    {
        Header: 'Employer',
        accessor: 'employer',
    },
    {
        Header: 'Location',
        accessor: 'location',
    },

    {
        Header: 'Hours',
        accessor: 'weekly_hours',
    },
    {
        Header: 'Rate',
        accessor: 'hourly_rate',
    },
    {
        Header: 'Uploaded',
        accessor: 'upload_date',
    },
    {
        Header: 'Closes',
        accessor: 'submission_deadline',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: '',
        accessor: 'job_url',
        Cell: ({ cell: { value } }) => (
            <NavLink href={value} blank>
                <ExternalLinkIcon className="h-5 w-5" />
            </NavLink>
        ),
    },
]
