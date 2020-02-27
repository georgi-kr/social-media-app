import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommentModule } from './comments/comment.module';
import { PostsDataService } from './services/posts-data.service';
import { PostComponent } from './post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostResolver } from '../../core/resolvers/single-post.resolver';
import { PostPreviewComponent } from '../explore/post-preview/post-preview.component';
import { PostDetailPreviewComponent } from './post-detail-preview/post-detail-preview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PostComponent,
    PostPreviewComponent,
    PostDetailPreviewComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    CommentModule,
    FormsModule,
  ],
  providers: [PostsDataService, SinglePostResolver],
  exports: [
    PostComponent,
    PostPreviewComponent,
    PostDetailPreviewComponent,
  ],
})
export class PostsModule {}
