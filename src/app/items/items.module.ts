import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateItemsComponent } from './components/create-items/create-items.component';
import { IndexComponent } from './pages/index/index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { ItemsRoutingModule } from './items-routing.module';
import { CategoriesModule } from '../categories/categories.module';
import { UpdateItemsComponent } from './components/update-items/update-items.component';

@NgModule({
  declarations: [CreateItemsComponent, IndexComponent, UpdateItemsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule,
    ItemsRoutingModule,
    CategoriesModule,
  ],
})
export class ItemsModule {}
