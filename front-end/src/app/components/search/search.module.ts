import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchComponent],
  imports: [SharedModule, FormsModule],
  exports: [SearchComponent]
})
export class SearchModule {}
