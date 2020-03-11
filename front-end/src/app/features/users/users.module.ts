import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { ProfileInfoComponent } from './components/user-profile/profile.component';
import { UsersDataService } from './services/users-data.service';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FollowsComponent } from './components/follows/follows.component';
import { SharedModule } from '../../shared-components/shared.module';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { PostsModule } from '../post/posts.module';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    UpdateProfileComponent,
    FollowsComponent,
    UserPostsComponent,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    FormsModule,
    CommonModule,
    PostsModule,
  ],
  providers: [UsersDataService],
  exports: [ProfileInfoComponent, UpdateProfileComponent, UserPostsComponent],
})
export class UsersModule {}
