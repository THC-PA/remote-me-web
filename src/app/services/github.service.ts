
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { takeUntil, groupBy, mergeMap, toArray, map, filter } from 'rxjs/operators';
import * as $ from 'jquery';

@Injectable()
export class GitHubService {
    //private baseUrl: string = 'https://jobs.github.com/positions.json?location=Remote&description=';
    private baseUrl: string = 'https://jobs.github.com/positions.json/';

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

    xhr: XMLHttpRequest;

    constructor(
        private httpClient: HttpClient) {
    }



    search(searchText) {
        // 1. Create a new XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // 2. Configure it: GET-request for the URL /article/.../load
        xhr.open('GET', this.baseUrl);

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

        xhr.onerror = function () {
            alert("Request failed");
        };
        /*   this.xhr = new XMLHttpRequest();
       //  var xhr = new XMLHttpRequest();
         this.xhr.onreadystatechange = this.handleStateChange; // Implemented elsewhere.
         this.xhr.onload = this.onload;
         this.xhr.open("GET", this.baseUrl, true);
         this.xhr.send();
         
     */

        /*let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
    
        const options = { headers: headers };
    
        $.ajax({
            url: this.baseUrl,
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
        console.log('got response: ' + JSON.stringify(data));
    // and other stuff i do with the data i get 
    }, 
            xhrFields: {
          withCredentials: false
        } 
          }) // end ajax
       
        return this.httpClient.jsonp(this.baseUrl, 'callback')
            .subscribe(res => {
                alert('got it')
            })*/

    }
    // .map((response: Response) => response[1])
    // .map((results: any[]) => results.map((result: string) => result[0]));
    //.subscribe(res => {
    //  console.log('github Results: ' + JSON.stringify(res));
    //});
    // }

}
/*

search(searchText: string) { //: Observable<Job[]>{
  this.baseUrl = this.urlService.getGitHubUrl();
  let jobs$ = this.httpClient
    .get(this.baseUrl + searchText, {headers: this.getHeaders()})
    .map(mapJobs)
    .catch(handleError);
    return jobs$;
}

private getHeaders(){
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  return headers;
}
}



function mapJobs(response:Response): Job[]{
 // uncomment to simulate error:
 // throw new Error('Force choke!');
 if (!response.json()){
   return [];
 }
 
 return response.json().map(toJob)
}

function cleanValue(val){
  if (val){

    //console.log('cleaning value: ' + val);

    let cleanedVal = val.toString();
    return cleanedVal;
  }
  return '';
}

function toJob(r:any): Job{
let job = <Job>({
  id: r.id,
  url: r.url,
  title: r.title.toString(),
  location: r.location,
 description: cleanValue(r.description),
  created_at: new Date(r.created_at),
  type: r.type,
  resultType: ResultTypes.gitHub,
  company: r.company.toString(),
  company_url: r.company_url,
  how_to_apply: r.how_to_apply,
  company_logo: r.company_logo,
  result_logo: './assets/images/GitHub-Mark-32px.png',
  isFavorite: false,
  isIgnored: false,
  resultUrl: 'https://jobs.github.com/'
});
 
return job;
}

// this could also be a private method of the component class
function handleError (error: any) {
// log error
let errorMsg = error.message || 'Something went wrong during search!';
console.error(errorMsg);

// throw an application level error
return Observable.throw(errorMsg);
}*/

 