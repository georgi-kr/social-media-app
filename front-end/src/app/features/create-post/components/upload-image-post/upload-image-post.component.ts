import { Component, ViewChild, Output, EventEmitter } from '@angular/core';

import { NotificatorService } from '../../../../core/services/notificator.service';
import { ImageCropperComponent } from '../../../image-cropper/component/image-cropper.component';
import { ImageCroppedEvent } from '../../../image-cropper/interfaces';
import { POST_LIMITS } from '../../constants/post-constants';

@Component({
  selector: 'app-upload-image-post',
  templateUrl: './upload-image-post.component.html',
  styleUrls: ['./upload-image-post.component.css']
})
export class UploadImagePostComponent {
  @Output() public sendBase64: EventEmitter<any> = new EventEmitter();

  public imageChangedEvent: Event = null;
  public croppedImage = '';
  public showCropper = false;

  @ViewChild(ImageCropperComponent, null) imageCropper: ImageCropperComponent;

  constructor(private readonly notificator: NotificatorService) {}

  /**
   * Detects changes in the input type file and validete the file.
   *
   * @param {Event} event - The event of chosing a file from the input.
   */
  fileChangeEvent(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    if (!/image\/(gif|jpg|jpeg|png)$/i.test(file.type)) {
      this.notificator.error('Invalid file format');
      this.imageChangedEvent = null;
      return;
    }
    if (file.size > POST_LIMITS.FILE_MAX_SIZE) {
      this.notificator.error('File size is over the limit (maximum size 10MB)');
      this.imageChangedEvent = null;
      return;
    }
    this.imageChangedEvent = event;
  }

  /**
   * Gets the cropped img base64 and emits it.
   *
   * @param {ImageCroppedEvent} event - The event of the image being cropped.
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.sendBase64.emit(this.croppedImage);
  }

  /**
   * Displays the image cropper after the image is loaded.
   */
  imageLoaded() {
    this.showCropper = true;
  }

  /**
   * Rotates the iage cropper to the left.
   */
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }

  /**
   * Rotates the iage cropper to the right.
   */
  rotateRight() {
    this.imageCropper.rotateRight();
  }

  /**
   * Rotates the iage cropper to the left.
   */
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }

  /**
   * Rotates the iage cropper to the left.
   */
  flipVertical() {
    this.imageCropper.flipVertical();
  }
}
