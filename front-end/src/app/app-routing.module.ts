import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './common/auth/auth.guard';
import { AdminGuard } from './common/auth/admin.guard';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { PATHS } from './common/constants/paths';

const routes: Routes = [
  {
    path: PATHS.HOMEPAGE,
    component: HomepageComponent,
  },
  {
    path: PATHS.HOME,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/newsfeed/newsfeed.module').then(
        m => m.NewsfeedModule
      ),
  },
  {
    path: PATHS.EXPLORE,
    loadChildren: () =>
      import('./components/explore/explore.module').then(m => m.ExploreModule),
  },
  {
    path: PATHS.ADMIN,
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./components/admin-history/admin-history.module').then(
        m => m.AdminHistoryModule
      ),
  },
  {
    path: PATHS.USERS,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/users/users.module').then(m => m.UsersModule),
  },
  {
    path: PATHS.POSTS,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/create-post/create-post.module').then(
        m => m.CreatePostModule
      ),
  },
  {
    path: PATHS.SEARCH,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/search-results/search-results.module').then(
        m => m.SearchResultsModule
      ),
  },
  { path: '', redirectTo: PATHS.HOMEPAGE, pathMatch: 'full' },
  { path: PATHS.NOT_FOUND, component: NotFoundComponent },
  { path: PATHS.SERVER_ERROR, component: ServerErrorComponent },
  { path: '**', redirectTo: PATHS.NOT_FOUND },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
