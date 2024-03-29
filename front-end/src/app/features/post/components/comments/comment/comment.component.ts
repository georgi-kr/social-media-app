import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentsDataService } from '../../../services/comments-data.service';
import { CommentDTO } from '../../../models/comment.dto';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit, OnDestroy {
  constructor(
    private readonly authService: AuthService,
    private readonly commentsDataService: CommentsDataService
  ) {}

  @Input() public comment: CommentDTO;
  @Output() public deleteComment: EventEmitter<CommentDTO> = new EventEmitter();
  public commentOwner: string;
  public updatedComment;
  public isCommentOwner = false;
  public show = false;
  public userSubscription: Subscription;

  ngOnInit() {
    this.updatedComment = this.comment.content;
    this.userSubscription = this.authService.loggedUser$.subscribe(res => {
      this.comment.createdOn = new Date();
      this.commentOwner = res.username;
      this.comment.user.username === this.commentOwner
        ? (this.isCommentOwner = true)
        : (this.isCommentOwner = false);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public toggleEditButton() {
    this.show = !this.show;
  }

  public updateComment() {
    this.comment.content = this.updatedComment;
    this.commentsDataService
      .updateCommentContent(this.comment.id, {
        content: this.updatedComment,
      })
      .toPromise();
  }

  public deleteCommentEmit() {
    this.deleteComment.emit(this.comment);
    this.commentsDataService.deleteComment(this.comment.id).toPromise();
  }
}
