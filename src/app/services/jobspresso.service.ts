import { Injectable } from "@angular/core";
import { tap, map, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Xml2JsonService } from './xml2json.service';
import { Job } from '../models/job.model';
import * as moment from 'moment';
import { HowToApply } from '../models/how-to-apply.model';
import { ResultTypes } from '../models/result-types.enum';
import { from } from 'rxjs';

@Injectable()
export class JobspressoService {
    private corsAnywhere: string = 'https://cors-anywhere.herokuapp.com/';
    private baseUrl: string = this.corsAnywhere + 'https://jobspresso.co/?feed=job_feed&search_keywords=';

    constructor(private httpClient: HttpClient, private xml2jsonService: Xml2JsonService) { }

    toJob(r: any): Job {
        return new Job(
            r.guid[0]._.toString(), 
            r.title.toString(), 
            'Remote',
            'none',
            r['job_listing:company'].toString(),
             null,
             null, 
             r.link.toString(),
            new HowToApply(false, r.link.toString(), ''),
           new Date(r.pubDate),
            r.description ? r.description.toString() : '',
             'assets/images/jobspresso.png',
            ResultTypes.jobspresso,
             '', 
            'https://jobspresso.co');
    }

    search(searchText: string) {
        return this.httpClient.request('GET', this.baseUrl, { responseType: 'text' })
            .pipe(flatMap(res => from(this.xml2jsonService.getJSON(res, searchText, this.toJob))));
    }
}