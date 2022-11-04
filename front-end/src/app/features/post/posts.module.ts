import { SharedModule } from '../../shared-components/shared.module';
import { FormsModule } from '@angular/forms';
import { PostsDataService } from './services/posts-data.service';
import { PostComponent } from './components/post-newsfeed-view/post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostResolver } from '../../core/resolvers/single-post.resolver';
import { PostPreviewComponent } from '../explore/components/post-preview/post-preview.component';
import { PostDetailPreviewComponent } from './components/post-detail-preview/post-detail-preview.component';
import { RouterModule } from '@angular/router';
import { CommentModule } from './comment.module';

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
