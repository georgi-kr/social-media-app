import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentsDataService } from './services/comments-data.service';
import { CreateCommentComponent } from './components/comments/create-comment/create-comment.component';
import { AllCommentsComponent } from './components/comments/all-comments/all-comments.component';
import { CommentsUnderPostComponent } from './components/comments/comments-under-post/comments-under-post.component';

@NgModule({
  declarations: [
    CommentComponent,
    CreateCommentComponent,
    AllCommentsComponent,
    CommentsUnderPostComponent,
  ],
  imports: [CommonModule, FormsModule],
  providers: [CommentsDataService],
  exports: [
    CommentComponent,
    CreateCommentComponent,
    AllCommentsComponent,
    CommentsUnderPostComponent,
  ],
})
export class CommentModule {}
