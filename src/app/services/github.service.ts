
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Job } from '../models/job.model';
import { ResultTypes } from '../models/result-types.enum';
import { HowToApply } from '../models/how-to-apply.model';
import { flatMap, map, mapTo } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Xml2JsonService } from './xml2json.service';

@Injectable()
export class GitHubService {
  private corsAnywhere: string = 'https://cors-anywhere.herokuapp.com/';
  private baseUrl: string = this.corsAnywhere + 'https://jobs.github.com/positions.json?location=Remote&description=';

    /*
    RESULTS:
    [
      {
        id: '123',
        created_at: 'Thu Apr 27 15:51:33 UTC 2017',
        title: 'Backend Engineer',
        location: 'New York, NY',
        type: 'Full Time',
        description: 'Bitly is seeking a mid-level Application Engineer with a focus on backend',
        how_to_apply: 'Please submit an application at bitly.com',
        company: 'Bitly',
        company_url: 'https://bitly.com',
        company_logo: 'http://github-jobs.s3.amazonaws.com/4f87941a-2b61-11e7-9bec-0567f184f79e.png',
        url: 'http://jobs.github.com/positions/544e6f5a-2b61-11e7-92fa-17226f7ce169'
      }
    ]
    */

    constructor(private httpClient: HttpClient) {}

    toJob(r:any): Job {
      let test = new Job(
        r.id,
        r.title || 'no title',
        r.location,
        r.type,
        r.company || 'no company name',
        r.company_url,
        r.company_logo,
        r.url,
        r.how_to_apply,
        new Date(r.created_at),
        r.description ? r.description.toString() : '',
        'assets/images/GitHub-Mark-32px.png',
        ResultTypes.gitHub,
        '',
        'https://jobs.github.com/'

      );

      console.log('setting result logo: ' + test.result_logo);
      return test;
    }

   

    search(searchText: string): Observable<Job[]> {
        return this.httpClient.get<Job[]>(this.baseUrl + searchText)
          .pipe(map(jobs => jobs.map(this.toJob)))
    }
  }