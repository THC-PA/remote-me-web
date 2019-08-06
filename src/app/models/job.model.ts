import { ResultTypes } from "./result-types.enum";

export class Job {
    [index: number]: string;
    id: string;
    title: string;
    location: string;
    type: string;
    company: string;
    company_url: string;
    company_logo: string;
    url: string;
    how_to_apply: string;
    created_at: Date;
    description: string;
    result_logo: string;
    resultType: ResultTypes;
    isFavorite: boolean;
    isIgnored: boolean;
    tags: string;
    resultUrl: string;
}