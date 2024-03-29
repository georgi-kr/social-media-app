import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDTO } from '../models/comment.dto';
import { CONFIG } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class CommentsDataService {
  constructor(private readonly http: HttpClient) {}

  public createComment(
    postId: string,
    body: { content: string }
  ): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(
      `${CONFIG.DOMAIN_NAME}/posts/${postId}/comments`,
      body
    );
  }

  public getCommentsOfPost(postId: string): Observable<CommentDTO[]> {
    return this.http.get<any>(`${CONFIG.DOMAIN_NAME}/posts/${postId}/comments`);
  }

  public deleteComment(commentId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${CONFIG.DOMAIN_NAME}/posts/comments/${commentId}`
    );
  }

  public updateCommentContent(
    commentId: string,
    body: { content: string }
  ): Observable<CommentDTO> {
    return this.http.put<CommentDTO>(
      `${CONFIG.DOMAIN_NAME}/posts/comments/${commentId}`,
      body
    );
  }
}
