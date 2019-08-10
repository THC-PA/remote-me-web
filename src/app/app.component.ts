import { Component, OnInit } from '@angular/core';
import { StackOverflowService } from './services/stackoverflow.service';
import { HttpHeaders } from '@angular/common/http';
import { GitHubService } from './services/github.service';
import { Observable, merge, forkJoin, BehaviorSubject } from 'rxjs';
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
export class AppComponent implements OnInit {
  title = 'remote-me-web';
  //private _allObs$: BehaviorSubject<Job[]> = new BehaviorSubject([]);
  //get allObs$(): Observable<Job[]> { return this._allObs$.asObservable() }
  allObs$: Observable<Job[]>[] = [];
  hasSearched: boolean = false;
  //allObs$: Array<Observable<Job[]>> = [];
  //jobs$: any;
  /*
  soJobs: Job[] = [];
  ghJobs: Job[] = [];
  roJobs: Job[] = [];
  ajJobs: Job[] = [];
  jpJobs: Job[] = [];
  indeedJobs: Job[] = [];*/

  searchText: string = 'angular'; 
  constructor(
     private stackoverflowService: StackOverflowService,
     private gitHubService: GitHubService, 
     private remoteOkService: RemoteOkService,
     private authenticJobsService: AuthenticJobsService,
     private jobspressoService: JobspressoService,
     private indeedService: IndeedService) {

     
     }

     ngOnInit() {
     
     }

  search() {  
    this.hasSearched = true;
    let soJobs$: Observable<Job[]> = this.stackoverflowService.search(this.searchText);
    let ghJobs$: Observable<Job[]> = this.gitHubService.search(this.searchText);
    let roJobs$: Observable<Job[]> = this.remoteOkService.search(this.searchText);
    let ajJobs$: Observable<Job[]> = this.authenticJobsService.search(this.searchText);
    let jpJobs$: Observable<Job[]> = this.jobspressoService.search(this.searchText);

    this.allObs$ = [soJobs$, ghJobs$, roJobs$, ajJobs$, jpJobs$]; 
  }
}
