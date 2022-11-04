import { User } from '../../users/models/user';

export class CommentDTO {
  public id: string;

  public content: string;

  public user: User;

  public createdOn: Date;
}
