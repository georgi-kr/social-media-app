import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDataService } from './services/admin-data.service';
import { SingleHistoryPreviewComponent } from './components/single-history-preview/single-history-preview.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHistoryComponent } from './components/admin-history-list/admin-history.component';

@NgModule({
  declarations: [AdminHistoryComponent, SingleHistoryPreviewComponent],
  imports: [CommonModule, AdminRoutingModule],
  providers: [AdminDataService],
})
export class AdminHistoryModule {}
