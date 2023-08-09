import { Component } from '@angular/core';
import { Item } from '../../classes/item';
import { ItemsService } from '../../services/items.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [MessageService, ConfirmationService],
})
export class IndexComponent {
  mostrarModal: boolean = false;
  mostarModalUpdate: boolean = false;
  items: Item[] = [];
  loading: boolean = false;
  first: number = 0;
  cols: any[] = [];
  total: number = 12;

  constructor(
    private itemService: ItemsService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.searchItems(null);
  }
  formSearch: FormGroup = this.fb.group({
    pageNo: [0, Validators.required],
    pageSize: [5, Validators.required],
    filters: [],
  });
  form: FormGroup = this.fb.group({
    items: '',
  });
  searchItems(evt: Event | null) {
    if (evt !== null) {
      this.loading = true;
      evt.preventDefault();
      let searchItem = this.formSearch.value;
      this.itemService.SearchItems(searchItem).subscribe((resp) => {
        this.items = resp.items;
        this.loading = false;
      });
    } else {
      this.loading = true;
      let searchItem = this.formSearch.value;
      this.itemService.SearchItems(searchItem).subscribe((resp) => {
        this.total = resp.total;
        this.items = resp.items;
        this.loading = false;
      });
    }
  }
  mostrarModalFunction() {
    this.mostrarModal = true;
  }
  mostrarModalFunctionUpdate(item: Item) {
    this.itemService
      .GetItemById(item.id)
      .pipe(
        tap((resp) => {
          this.form.get('items')?.setValue(resp.data);
        })
      )
      .subscribe();
    this.mostarModalUpdate = true;
  }
  recibirMostrarModal(valor: boolean) {
    if (!valor) {
      this.searchItems(null);
      this.form.patchValue({
        id: 0,
        code: '',
        name: '',
        description: '',
        category: '',
        defaultPrice: 0,
        defaultCost: 0,
      });
      this.mostrarModal = valor;
    }
  }
  recibirMostrarModalUpdate(valor: boolean) {
    if (!valor) {
      this.searchItems(null);
      this.form.patchValue({
        id: 0,
        code: '',
        name: '',
        description: '',
        category: '',
        defaultPrice: 0,
        defaultCost: 0,
      });
      this.mostarModalUpdate = valor;
    }
  }
  onPageChange(event: any) {
    this.first = event.rows == event.first ? this.first++ : this.first;
    this.formSearch.patchValue({
      pageNo: 0,
      pageSize: event.rows,
    });
    this.searchItems(null);
  }
  //delete Item by Id
  removeItem(itemId: string) {
    this.itemService.DeleteItem(itemId).subscribe((resp) => {
      if (resp.success === true) {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Success',
          detail: 'Se elimino satisfactoriamente',
        });
        this.searchItems(null);
      } else {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error',
          detail: resp.message,
        });
        return;
      }
    });
  }
  //Confirm delete Item by Id
  confirmarDelete(itemId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the Item?',
      accept: () => {
        this.removeItem(itemId);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
