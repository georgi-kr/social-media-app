import { PostsDataService } from './services/posts-data.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostDTO } from './models/post.dto';
import * as moment from 'moment';
import { DialogService } from '../../core/services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() public post: PostDTO;
  public dateOfPost: string;
  public likes = { likes: 0 };
  public myLike = false;
  public showComments = false;
  private getLikesOfPostSubscription: Subscription;

  constructor(
    private readonly postsDataService: PostsDataService,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dateOfPost = moment(this.post.postedOn).format('MMM Do YY (HH:mm)');

    this.getLikesOfPostSubscription = this.postsDataService
      .getLikesOfPost(this.post.id)
      .subscribe(res => {
        this.likes = res.likes;
        this.myLike = res.myLikes.isLiked;
      });
  }

  ngOnDestroy() {
    this.getLikesOfPostSubscription.unsubscribe();
  }

  public likePost() {
    this.getLikesOfPostSubscription = this.postsDataService
      .likePost(this.post.id)
      .subscribe(response => {
        this.postsDataService.getLikesOfPost(this.post.id).subscribe(res => {
          this.likes.likes = res.likes.likes;
          this.myLike = res.myLikes.isLiked;
        });
      });
  }

  public openPost() {
    this.dialogService.openPostPreview({
      data: { user: this.post.user, post: this.post },
    });
  }

  public toggleComments() {
    this.showComments = !this.showComments;
  }

  public get userLink() {
    return ['/users', this.post.user.username];
  }

  public deletePost() {
    this.postsDataService.deletePost(this.post.id).toPromise();
  }
}
