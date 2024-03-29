
import { CommentsDataService } from '../../../services/comments-data.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostDTO } from '../../../models/post.dto';
import { User } from 'src/app/features/users/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { CommentDTO } from '../../../models/comment.dto';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css'],
})
export class AllCommentsComponent implements OnInit, OnDestroy {
  @Input() post: PostDTO;
  public haveComments = false;
  public user: User;
  private loggedInSubscription: Subscription;
  private createCommentSubscription: Subscription;

  constructor(
    private readonly commentsDataService: CommentsDataService,
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService
  ) {}

  public ngOnInit() {
    this.loggedInSubscription = this.authService.loggedUser$.subscribe(
      res => (this.user = res)
    );
  }

  public ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.createCommentSubscription.unsubscribe();
  }

  public createComment(content: any) {
    this.createCommentSubscription = this.commentsDataService
      .createComment(this.post.id, content)
      .subscribe(
        res => {
          this.post.comments = [res, ...this.post.comments];
          this.haveComments = true;
        },
        errors => {
          this.notificator.error('Could not create comment');
        }
      );
  }

  public removeComment(commentToBeDeleted: CommentDTO) {
    const index = this.post.comments.indexOf(commentToBeDeleted);
    this.post.comments.splice(index, 1);
  }
}
