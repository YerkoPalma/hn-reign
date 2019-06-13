import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface FeedData {
  id: number;
  title: string;
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
  displayedColumns: string[] = ['id', 'title', 'date'];
  dataSource: MatTableDataSource<FeedData>;

  constructor() {
    const data: FeedData[] = [{
      id: 1,
      title: 'Example feed',
      url: '',
      date: new Date(),
      visible: true
    }];

    this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit() {
  }

}
