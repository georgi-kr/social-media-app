import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../common/auth/auth.guard';
import { PATHS } from 'src/app/common/constants/paths';
import { CreatePostComponent } from './components/create-post-view/create-post.component';

const routes: Routes = [
  {
    path: PATHS.CREATE,
    canActivate: [AuthGuard],
    component: CreatePostComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePostsRoutingModule {}
