import { Injectable } from '@angular/core'; 
import { Job } from '../models/job.model';
import * as _ from 'underscore';

@Injectable()
export class FilterService {
  
  constructor(){
  }

  filter(res, searchText){
    //Search Tags, title, description for matching searchText...
    let filtered: Job[] = [];

    for (let i = 0; i < res.length; i++){
      let desc = res[i].description;
      let div = document.createElement('div');
      div.innerHTML = desc;
      let text = div.textContent || div.innerText || '';
      text = text.replace(/\W/g, '');
      
      if (text.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
        //console.log('found search text: ' + searchText + ' in description');
        if (!_.find(filtered, {id: res[i].id })){
          filtered.push(res[i]);
        }
      }
      
      if (res[i].title.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
       // console.log('found search text: ' + searchText + ' in title: ' + res[i].title);
        if (!_.find(filtered, {id: res[i].id })){
          filtered.push(res[i]);
        }
      }

      if (res[i].tags.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
        //console.log('found search text: ' + searchText + ' in tags: ' + res[i].tags);
        if (!_.find(filtered, {id: res[i].id })){
          filtered.push(res[i]);
        }
      }

      if (res[i].company.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
        //console.log('found search text:' + searchText + ' in COMPANY: '+ res[i].company);
        if (!_.find(filtered, {id: res[i].id})){
          filtered.push(res[i]);
        }
      }
    }

    return filtered;
  }
   
}