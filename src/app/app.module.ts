import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { StackOverflowService } from './services/stackoverflow.service';
import { GitHubService } from './services/github.service';
import { FormsModule } from '@angular/forms';
import { FilterService } from './services/filter.service';
import { Xml2JsonService } from './services/xml2json.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule, MatDialogModule, MatGridListModule, MatToolbarModule, MatSelectModule, MatExpansionModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatExpansionModule,
    MatGridListModule,
    MatDialogModule,  
    FlexLayoutModule
    
  ],
  providers: [StackOverflowService, GitHubService, FilterService, Xml2JsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
