import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { distanceInWordsToNow } from 'date-fns';
import { ConfirmComponent } from './confirm/confirm.component';
import { FeedService } from './feed.service';

export interface FeedData {
  id: number;
  title: string;
  author: string;
  url: string;
  date: Date;
  visible: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['title', 'date', 'controls'];
  dataSource: MatTableDataSource<FeedData>;
  format = distanceInWordsToNow;

  constructor(
    public dialog: MatDialog,
    private feedService: FeedService
  ) {

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.feedService
      .getFeeds()
      .subscribe(feeds => this.dataSource.data = feeds);
  }

  openDialog() {
    this.dialog.open(ConfirmComponent);
  }
}
