import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './pages/index/index.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoriesComponent } from './components/update-categories/update-categories.component';
import { ShowCategoriesComponent } from './components/show-categories/show-categories.component';
import { SelectCategoriesComponent } from './components/select-categories/select-categories.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateCategoriesComponent,
    UpdateCategoriesComponent,
    ShowCategoriesComponent,
    SelectCategoriesComponent,
  ],
  exports: [SelectCategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
  ],
})
export class CategoriesModule {}
