import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { PostsDataService } from '../../features/post/services/posts-data.service';
import { PostDTO } from '../../features/post/models/post.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
})
export class LikesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public post: PostDTO;
  private likePostSubscription: Subscription;
  public likes = { likes: 0 };
  public myLike = false;

  constructor(private readonly postsDataService: PostsDataService) {}

  public likePost() {
    this.likePostSubscription = this.postsDataService.likePost(this.post.id).subscribe(r => {
      this.postsDataService.getLikesOfPost(this.post.id).subscribe(res => {
        this.likes.likes = res.likes.likes;
        this.myLike = res.myLikes.isLiked;
      });
    });
  }

  public getNumberOfLikes() {
    return this.likes.likes;
  }

  ngOnInit() {
    this.likePostSubscription = this.postsDataService
      .getLikesOfPost(this.post.id)
      .subscribe(res => {
        this.likes = res.likes;
        this.myLike = res.myLikes.isLiked;
      });
  }

  ngOnDestroy() {
    this.likePostSubscription.unsubscribe();
  }

  private changeView() {
    this.postsDataService.getLikesOfPost(this.post.id).subscribe(res => {
      this.likes = res.likes;
      this.myLike = res.myLikes.isLiked;
    });
  }

  ngAfterViewInit() {
    this.changeView();
  }
}
