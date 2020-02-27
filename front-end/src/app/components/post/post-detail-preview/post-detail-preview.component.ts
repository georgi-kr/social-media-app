import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PostsDataService } from '../services/posts-data.service';
import * as moment from 'moment';
import { PostDTO } from '../models/post.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail-preview',
  templateUrl: './post-detail-preview.component.html',
  styleUrls: ['./post-detail-preview.component.css'],
})
export class PostDetailPreviewComponent implements OnInit, OnDestroy {
  public post: PostDTO;
  public dateOfPost: string;
  public username: string;
  public avatar: string;
  private getPostSubscription: Subscription;

  constructor(
    private readonly postsService: PostsDataService,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getPostSubscription = this.postsService
      .getPostById(this.data.data.post.id)
      .subscribe(response => {
        this.post = response;
        this.username = this.post.user.username;
        this.avatar = this.post.user.avatar;
        this.dateOfPost = moment(this.post.postedOn).format(
          'MMM DD YYYY, HH:mm'
        );
      });
  }

  ngOnDestroy() {
    this.getPostSubscription.unsubscribe();
  }

  public close() {
    this.dialog.closeAll();
  }

  public get userLink() {
    return ['/users', this.post.user.username];
  }
}
