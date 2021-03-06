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
export class StackOverflowService {
    private corsAnywhere: string = 'https://cors-anywhere.herokuapp.com/';
    private baseUrl: string = this.corsAnywhere + 'http://stackoverflow.com/jobs/feed?r=true&q=';

    constructor(private httpClient: HttpClient, private xml2jsonService: Xml2JsonService) { }

    toJob(r: any): Job {
        return new Job(
            r.guid[0]._.toString(), 
            r.title.toString(), 
            r.location,
            'none', 
            r['a10:author'][0]['a10:name'].toString(),
             null, 
             null, 
             r.link.toString(),
            new HowToApply(false, r.link.toString(), ''), 
            moment(r.pubDate, 'ddd, DD MMM YYYY hh:mm:ss Z').local().toDate(),
            r.description ? r.description.toString() : '',
             './assets/images/so-icon.png', 
            ResultTypes.stackOverflow, '', 
            'https://stackoverflow.com/jobs');
    }

    search(searchText: string) {
        return this.httpClient.request('GET', this.baseUrl + searchText, { responseType: 'text' })
            .pipe(flatMap(res => from(this.xml2jsonService.getJSON(res, searchText, this.toJob))));
    }
}