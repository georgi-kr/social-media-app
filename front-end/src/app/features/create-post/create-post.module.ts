import { SharedModule } from '../../shared-components/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCropperModule } from '../image-cropper/image-cropper.module';
import { CreatePostsRoutingModule } from './create-post-routing.module';
import { PostsDataService } from '../post/services/posts-data.service';
import { UploadImagePostComponent } from './components/upload-image-post/upload-image-post.component';
import { CreatePostComponent } from './components/create-post-view/create-post.component';

@NgModule({
  declarations: [UploadImagePostComponent, CreatePostComponent],
  imports: [
    SharedModule,
    CommonModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePostsRoutingModule
  ],
  providers: [PostsDataService],
  exports: [CreatePostComponent]
})
export class CreatePostModule {}
