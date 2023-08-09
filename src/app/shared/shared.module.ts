import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CapitalizeFirstLetterPipe } from './pipe/capitalize-first-letter.pipe';


@NgModule({
  declarations: [
    MenuSuperiorComponent,
    CapitalizeFirstLetterPipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    MenuSuperiorComponent,
    CapitalizeFirstLetterPipe

  ]
})
export class SharedModule { }
