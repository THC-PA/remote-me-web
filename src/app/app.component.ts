import { Component } from '@angular/core';
import { StackOverflowService } from './services/stackoverflow.service';
import { HttpHeaders } from '@angular/common/http';
import { GitHubService } from './services/github.service';
import { Observable, merge, forkJoin } from 'rxjs';
import { Job } from './models/job.model';
import { mergeAll, mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { RemoteOkService } from './services/remoteok.service';
import { AuthenticJobsService } from './services/authenticjobs.service';
import { JobspressoService } from './services/jobspresso.service';
import { IndeedService } from './services/indeed.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remote-me-web';
  //jobs$: any;
  soJobs: Job[] = [];
  ghJobs: Job[] = [];
  roJobs: Job[] = [];
  ajJobs: Job[] = [];
  jpJobs: Job[] = [];
  indeedJobs: Job[] = [];

  searchText: string = 'angular'; 
  constructor(
     private stackoverflowService: StackOverflowService,
     private gitHubService: GitHubService, 
     private remoteOkService: RemoteOkService,
     private authenticJobsService: AuthenticJobsService,
     private jobspressoService: JobspressoService,
     private indeedService: IndeedService) {}

  search() {  

    let soJobs$: Observable<Job[]> = this.stackoverflowService.search(this.searchText);
    let ghJobs$: Observable<Job[]> = this.gitHubService.search(this.searchText);
    let roJobs$: Observable<Job[]> = this.remoteOkService.search(this.searchText);
    let ajJobs$: Observable<Job[]> = this.authenticJobsService.search(this.searchText);
    let jpJobs$: Observable<Job[]> = this.jobspressoService.search(this.searchText);
   // let indeedJobs$: Observable<Job[]> = this.indeedService.search(this.searchText);

    if (this.searchText) {
      combineLatest(soJobs$, ghJobs$, roJobs$, ajJobs$, jpJobs$)
        .subscribe(([soJobs, ghJobs, roJobs, ajJobs, jpJobs]) => {
          this.soJobs = soJobs;
          this.ghJobs = ghJobs;
          this.roJobs = roJobs;
          this.ajJobs = ajJobs;
          this.jpJobs = jpJobs;
        });

        //ghJobs$.subscribe(res => console.log('final res: ' + JSON.stringify(res)));
       
      
    }
  }
}
