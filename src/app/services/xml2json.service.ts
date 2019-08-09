import * as xml2js from 'xml2js';
import { Injectable } from '@angular/core';
import { FilterService } from './filter.service';
import { HowToApply } from '../models/how-to-apply.model';
import { Job } from '../models/job.model';

@Injectable()
export class Xml2JsonService {
    constructor(private filterService: FilterService){}

    
    
cleanValue(val){
    if (val){
      return val.toString();
    }
  
    return '';
  }

  getApplyUrl(text: string): HowToApply {
    return { isEmailLink: false, applyText: '', applyUrl: text};
  }
  
    getJSON(xmlText, searchText, mapper): Promise<Job[]>{
        let context = this;
        return new Promise(function(resolve,reject){
            xml2js.parseString(xmlText,function(err,result){
                if(!err){
                  if(!result.rss.channel[0].item){
                    resolve([]);
                  }
                  
                  let filteredResults = context.filterService.filter(result.rss.channel[0].item.map(mapper), searchText);
                  resolve(filteredResults);
                }else{
                    reject(err);
                }
            });
        });
      }

      getJSONNoFilter(xmlText, mapper){
        return new Promise(function(resolve,reject){
            xml2js.parseString(xmlText,function(err,result){
                if(!err){
                  if(!result.rss.channel[0].item){
                    resolve([]);
                  }
                  
                  let results = result.rss.channel[0].item.map(mapper);
                  resolve(results);
                }else{
                    reject(err);
                }
            });
        });
      }
}