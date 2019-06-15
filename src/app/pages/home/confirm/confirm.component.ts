import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private feedService: FeedService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  deleteFeed(feedID: number): void {
    this.feedService
      .deleteFeed(feedID)
      .subscribe(() => {
        this.dialog.closeAll();
        this.data.parent.deleteFeed(feedID);
      });
  }
}
