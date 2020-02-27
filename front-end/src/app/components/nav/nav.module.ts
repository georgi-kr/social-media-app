
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavComponent } from './nav.component';
import { SearchModule } from '../search/search.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [NavComponent],
  imports: [SearchModule, SharedModule, RouterModule],
  exports: [NavComponent]
})
export class NavModule {}
