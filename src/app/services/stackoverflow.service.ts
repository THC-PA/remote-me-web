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

    /*
    getJSON(xmlText, searchText) {
        let context = this;
        return new Promise(function (resolve, reject) {
            xml2js.parseString(xmlText, function (err, result) {
                if (!err) {
                    if (!result.rss.channel[0].item) {
                        resolve([]);
                    }
                    let filtered = context.filterService.filter(result.rss.channel[0].item.map(toJob), searchText);
                    resolve(filtered);
                } else {
                    reject(err);
                }
            })
        })
    }*/

    
 
    toJob(r: any, context: any): Job {      
       /* let job = <Job>({
          id: r.guid[0]._.toString(),
          url: r.link.toString(),
          title: r.title.toString(),
          location: r.location,
          description: context.cleanValue(r.description),
          created_at: moment(r.pubDate, 'ddd, DD MMM YYYY hh:mm:ss Z').local().toDate(),
          type: 'none',
          company: r['a10:author'][0]['a10:name'].toString(),
          company_url: null,
          how_to_apply: this.getApplyUrl(r.link.toString()),
          resultType: ResultTypes.stackOverflow,
          company_logo: null,
          result_logo: './assets/images/so-icon.png',
          isFavorite: false,
          isIgnored: false,
          tags: '',//r.category.toString() || '',
          resultUrl: 'https://stackoverflow.com/jobs'
        });*/
        
        //return job;

        return new Job(r.guid[0]._.toString(), r.title.toString(), r.location, 
            'none',  r['a10:author'][0]['a10:name'].toString(), null, null, r.link.toString(),
            new HowToApply(false, r.link.toString(), ''), moment(r.pubDate, 'ddd, DD MMM YYYY hh:mm:ss Z').local().toDate(),
            r.description ? r.description.toString() : '', './assets/images/so-icon.png', ResultTypes.stackOverflow, '',  'https://stackoverflow.com/jobs');
      }
      
    search(searchText: string) {
         
        return this.httpClient.request('GET', this.baseUrl + searchText, { responseType: 'text'})
            .pipe(flatMap(res => from(this.xml2jsonService.getJSON(res, searchText, this.toJob))));
            //.pipe(map(res => {
              //   return from(this.xml2jsonService.getJSON(res, searchText, this.toJob));
//                }));
                    
            
   // return this.httpClient.get<any>(this.baseUrl,{ observe: 'response', responseType: 'text' }).pipe(tap(res => {
       /* const Link  = this.parse_link_header(res.headers.get('Link'));
        this.first  = Link["first"];
        this.last   = Link["last"];
        this.prev   = Link["prev"];
        this.next   = Link["next"];       */
   //   })); 

    //headers = headers.set('Accept', 'application/javascript');
        //const options = { headers };
        /*return this.httpClient.get<any>(this.baseUrl + searchText)
            .pipe(map((res: any) => {
                console.log('**HMMM : ' + JSON.stringify(res.text()));
            }));

            */
        //    .subscribe(res => {
           //     console.log('StackOverflow Results: ' + JSON.stringify(res));
          //  });


           /* let xhr = new XMLHttpRequest();

            // 2. Configure it: GET-request for the URL /article/.../load
            xhr.open('GET', this.baseUrl);
            xhr.overrideMimeType;
            //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            // 3. Send the request over the network
            xhr.send();
    
            // 4. This will be called after the response is received
            xhr.onload = function () {
                console.log('received response. status: ' + xhr.status
                 + ' statusText: ' + xhr.statusText + ' test: ' + xhr.response);
                
            };
    
            xhr.onprogress = function (event) {
                if (event.lengthComputable) {
                    alert(`Received ${event.loaded} of ${event.total} bytes`);
                } else {
                    alert(`Received ${event.loaded} bytes`); // no Content-Length
                }
    
            };
    
            xhr.onerror = function (err) {
                
                alert("Request failed: " + JSON.stringify(err));
            };*/
    }
}