import { ResultTypes } from "./result-types.enum";
import { HowToApply } from './how-to-apply.model';

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
    how_to_apply: HowToApply;
    created_at: Date;
    description: string;
    result_logo: string;
    resultType: ResultTypes;
    isFavorite: boolean;
    isIgnored: boolean;
    tags: string;
    resultUrl: string;

    constructor(id: string, title: string, location: string, type: string, company: string, company_url: string,
        company_logo: string, url: string, how_to_apply: HowToApply, created_at: Date, description: string,
        result_logo: string, resultType: ResultTypes, tags: string, resultUrl: string) {
            this.id = id;
            this.title = title;
            this.location = location;
            this.type = type;
            this.company = company;
            this.company_url = company_url;
            this.company_logo = company_logo;
            this.url = url;
            this.how_to_apply = how_to_apply;
            this.created_at = created_at;
            this.description = description;
            this.result_logo = result_logo;
            this.resultType = resultType;
            this.tags = tags;
            this.resultUrl = resultUrl;
        }
}