import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FeedService } from './feed.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, ConfirmComponent],
  entryComponents: [
    ConfirmComponent
  ],
  providers: [
    FeedService
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ]
})
export class HomeModule { }
