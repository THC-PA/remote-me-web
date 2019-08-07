import { Component } from '@angular/core';
import { StackOverflowService } from './services/stackoverflow.service';
import { HttpHeaders } from '@angular/common/http';
import { GitHubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remote-me-web';
  searchText: string = '';

  constructor(private stackoverflowService: StackOverflowService, private gitHubService: GitHubService) {}

  search() {  
    if (this.searchText) {
      this.stackoverflowService.search(this.searchText).subscribe(res => {
        console.log('FINAL RES: ' + JSON.stringify(res));
      })
       // .subscribe(res=> {
     //     console.log('***FINAL got res: ' + JSON.stringify(res));
     //   })
    }
  }
}
