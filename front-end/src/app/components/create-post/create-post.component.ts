import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostsDataService } from '../post/services/posts-data.service';
import { NotificatorService } from '../../core/services/notificator.service';

import { CreatePostDTO } from './models/create-post.dto';
import { POST_LIMITS } from './constants/post-constants';
import { PATHS } from 'src/app/common/constants/paths';
import { UploadImgDTO } from './models/upload-img.dto';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public imgUrl: string;
  public description: string;
  public isPrivate = false;
  public uploadForm: FormGroup;
  public readonly maxLength = POST_LIMITS.DESCRIPTION_MAX_LENGTH;

  constructor(
    private readonly postsDataService: PostsDataService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.uploadForm = this.fb.group({
      description: ['', [Validators.maxLength(this.maxLength)]]
    });
  }

  ngOnInit() {}

  /**
   * Gets the base64 string and split it in order to get only the second part.
   *
   * @param {string} base64 - The base64 string of the image.
   */
  public imageCropped(base64: string) {
    const base64Arr = base64.split(',');
    this.imgUrl = base64Arr[1];
  }

  /**
   * Submits the form uploads the image by the postDataService
   * and gets the link for the image,
   * then send all the information to the back-end via
   * postDataService and redirects to homepage.
   */
  public onFormSubmit() {
    if (!this.imgUrl) {
      this.notificator.error('Please select image');
      return;
    }
    if (!this.uploadForm.valid) {
      this.notificator.error('Form is not valid');
      return;
    }
    let imgurUrl = '';
    this.notificator.warn('Uploading new post...');
    this.postsDataService.uploadPhoto(this.imgUrl).subscribe(
      (photoData: UploadImgDTO) => {
        imgurUrl = photoData.photoLink;
        const post: CreatePostDTO = {
          description: this.description,
          photoUrl: imgurUrl,
          isPrivate: this.isPrivate,
        };
        this.postsDataService.createPost(post).subscribe(() => {
          this.notificator.success('Post uploaded succesfully');
          this.router.navigate([PATHS.HOME]);
        });
      },
      () => this.notificator.error('Could not upload picture')
    );
  }

  /**
   * Checks the post as private.
   */
  public flagAsPrivate() {
    this.isPrivate = true;
  }

  /**
   * Checks the post as public.
   */
  public flagAsPublic() {
    this.isPrivate = false;
  }
}
