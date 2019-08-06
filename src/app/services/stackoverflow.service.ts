import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, XhrFactory } from '@angular/common/http';
import { Job } from '../models/job.model';
import * as $ from 'jquery';

@Injectable()
export class StackOverflowService {
    private baseUrl: string = 'http://stackoverflow.com/jobs/feed?r=true&q=';

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
        

        /*return this.httpClient.get(this.baseUrl + searchText, options)
            .subscribe(res => {
                console.log('StackOverflow Results: ' + JSON.stringify(res));
            });*/
            let xhr = new XMLHttpRequest();

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
                /*if (xhr.status != 200) { // analyze HTTP status of the response
                    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                } else { // show the result
                    alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
                }*/
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
            };
    }
}