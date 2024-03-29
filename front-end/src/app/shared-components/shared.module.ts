import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LikesComponent } from './likes/likes.component';
import { MinimizedUserModule } from './minimized-user/minimized-user.module';
import { ConformationDialogBoxComponent } from './conformation-dialog-box/conformation-dialog-box.component';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [ConformationDialogBoxComponent, LikesComponent],
  imports: [MinimizedUserModule, MatDialogModule, CommonModule, FormsModule],
  exports: [
    MinimizedUserModule,
    ConformationDialogBoxComponent,
    LikesComponent,
    InfiniteScrollModule,
    CommonModule,
    FormsModule,
  ],
})
export class SharedModule {}
