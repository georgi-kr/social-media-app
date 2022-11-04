import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from 'src/app/core/services/search.service';
import { PostDTO } from '../../../post/models/post.dto';
import { SearchPostQueryDTO } from './models/search-post-query.dto';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public routeSubscription: Subscription;
  public posts: PostDTO[] = [];
  public title: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (queries: SearchPostQueryDTO) => {
        this.title = queries.keyword;
        this.searchService
          .searchPosts(queries.keyword)
          .subscribe((posts: PostDTO[]) => {
            this.posts = posts;
          });
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
