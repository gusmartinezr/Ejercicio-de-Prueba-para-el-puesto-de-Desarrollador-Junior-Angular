import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//primeng 
import { AutoCompleteModule } from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {AccordionModule} from 'primeng/accordion';
import {FileUploadModule} from 'primeng/fileupload';
import {SelectButtonModule} from 'primeng/selectbutton';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ScrollerModule} from 'primeng/scroller';
import {GalleriaModule} from 'primeng/galleria';
import {TabViewModule} from 'primeng/tabview';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
  exports:[
    ButtonModule,
    TagModule,
    InputTextModule,
    CheckboxModule,
    AutoCompleteModule,
    AccordionModule,
    FileUploadModule,
    SelectButtonModule,
    MenubarModule,
    TableModule,
    DialogModule,
    VirtualScrollerModule,
    ScrollerModule,
    GalleriaModule,
    TabViewModule,
    CardModule,
    FieldsetModule,
    ToastModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    ProgressSpinnerModule, 
    PaginatorModule,
    ProgressBarModule
  ]
})
export class PrimeNgModule { }
