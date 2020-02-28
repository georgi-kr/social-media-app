import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ShowDetailedInfoDTO } from '../../features/users/models/show-detailed-info.dto';
import { PostDTO } from 'src/app/features/post/models/post.dto';
import { CONFIG } from '../../config/config';

@Injectable()
export class SearchService {
  constructor(private readonly http: HttpClient) {}

  public searchUsers(username: string): Observable<ShowDetailedInfoDTO[]> {
    return this.http.get<ShowDetailedInfoDTO[]>(
      `${CONFIG.DOMAIN_NAME}/users?username=${username}`
    );
  }

  public searchPosts(postDescription: string): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(
      `${CONFIG.DOMAIN_NAME}/posts/description?keyword=${postDescription}`
    );
  }
}
