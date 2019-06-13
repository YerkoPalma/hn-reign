import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { distanceInWordsToNow } from 'date-fns';
import { ConfirmComponent } from './confirm/confirm.component';

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

  constructor(public dialog: MatDialog) {
    const data: FeedData[] = [{
      id: 1,
      title: 'Example feed',
      url: '',
      author: 'Yerko',
      date: new Date(),
      visible: true
    }];

    this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(ConfirmComponent);
  }
}
