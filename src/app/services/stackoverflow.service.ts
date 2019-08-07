import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, XhrFactory } from '@angular/common/http';
import { Job } from '../models/job.model';
import * as $ from 'jquery';
import { map } from 'rxjs/operators';

@Injectable()
export class StackOverflowService {
  private corsAnywhere: string = 'https://cors-anywhere.herokuapp.com/';
    private baseUrl: string = this.corsAnywhere + 'http://stackoverflow.com/jobs/feed?r=true&q=';

    constructor(private httpClient: HttpClient) { }

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

    search(searchText: string) {
        
    let headers = new HttpHeaders();
    headers = headers.set('Accept', ['application/json', 'text/plain', '*/*']);
        const options = { headers };
        return this.httpClient.get<any>(this.baseUrl + searchText, options)
            .pipe(map((res: any) => {
                console.log('**HMMM : ' + JSON.stringify(res.text()));
            }));
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