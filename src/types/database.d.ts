export interface ReadProjectsProps {
    projects: Project[]
}

export interface Project {
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

export interface ReadItemsProps {
    items: Resume[];
}

export interface Resume {
    id:              string;
    consultant_id:   string;
    consultant_name: string;
    description:     string;
    matchmaking:     boolean;
    keywords:        string;
    keywords_count:  string;
    _rid:            string;
    _self:           string;
    _etag:           string;
    _attachments:    string;
    _ts:             number;
}