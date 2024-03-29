import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { PostDTO } from '../../../post/models/post.dto';
import { ShowDetailedInfoDTO } from '../../models/show-detailed-info.dto';
import { User } from '../../models/user';
import { AuthService } from '../../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements DoCheck {
  @Input() user: ShowDetailedInfoDTO;
  @Input() followed = true;
  @Input() isOwner = false;
  public copyOfPosts: PostDTO[];

  constructor(private readonly authService: AuthService) {}

  public ngDoCheck() {
    this.changeView();
  }

  public changeView() {
    if (this.isOwner === false && this.followed === false) {
      this.copyOfPosts = this.user.posts.filter(
        post => post.isPrivate === false
      );
    } else {
      if (this.user) {
        this.copyOfPosts = [...this.user.posts];
      }
    }
  }
}
