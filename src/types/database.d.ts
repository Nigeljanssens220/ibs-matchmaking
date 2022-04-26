interface ReadProjectsProps {
    projects: Project[]
}

interface Project {
    id: string
    source: 'jobcatcher' | 'fixedtoday'
    upload_date: number
    job_title: string
    kw_unique: string[]
    kw_bow: string[]
    employer?: string
    location: string
    weekly_hours?: string
    hourly_rate?: null
    submission_deadline: number
    job_url: string
    job_description_clean: string
    job_description_html: string
    _rid: string
    _self: string
    _etag: string
    _attachments: string
    _ts: number
    matched?: string[]
    not_matched?: string[]
    match_length?: number
    not_matched_length?: number
}
