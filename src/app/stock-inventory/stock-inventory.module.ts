import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';

import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockProductsComponent } from './components/stock-products/stock-products.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { StockCounterComponent } from './components/stock-counter/stock-counter.component';
import { StockInventoryService } from './services/stock-inventory.service';
import { StockFilesComponent } from './components/stock-files/stock-files.component';
import { StockUploadComponent } from './components/stock-upload/stock-upload.component';

@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent,
    StockCounterComponent,
    StockFilesComponent,
    StockUploadComponent
  ],
  providers: [
    StockInventoryService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    StockInventoryComponent
  ]
})
export class StockInventoryModule {}