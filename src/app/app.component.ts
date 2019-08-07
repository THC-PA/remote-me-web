import { Component } from '@angular/core';
import { StackOverflowService } from './services/stackoverflow.service';
import { HttpHeaders } from '@angular/common/http';
import { GitHubService } from './services/github.service';
import { Observable } from 'rxjs';
import { Job } from './models/job.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remote-me-web';
  jobs$: Observable<Job[]>;
  searchText: string = ''; 
  constructor(private stackoverflowService: StackOverflowService, private gitHubService: GitHubService) {}

  search() {  
    if (this.searchText) {
      this.jobs$ = this.stackoverflowService.search(this.searchText);//.subscribe(res => {
        //console.log('FINAL RES: ' + JSON.stringify(res));
      //})
      
    }
  }
}
