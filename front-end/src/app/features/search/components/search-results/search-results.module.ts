import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared-components/shared.module';
import { PostsModule } from '../../../post/posts.module';
import { SearchResultsComponent } from './search-results.component';
import { SearchResultsRoutingModule } from './search-results-routing.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [SharedModule, PostsModule, SearchResultsRoutingModule],
  providers: [],
  exports: [SearchResultsComponent],
})
export class SearchResultsModule {}
