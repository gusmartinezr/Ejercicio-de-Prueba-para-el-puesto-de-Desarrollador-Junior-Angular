import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../classes/category';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [MessageService, ConfirmationService],
})
export class IndexComponent {
  mostrarModal: boolean = false;
  mostarModalUpdate: boolean = false;
  categories: Category[] = [];
  rows: number = 10;
  first: number = 0;
  firstRecordIndex = 0;
  loading: boolean = false;
  total: number = 0;
  visible: boolean = false;
  showCategory: Category = new Category();
  constructor(
    private categoryService: CategoriesService,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.searchCategories(null);
  }

  formSearch: FormGroup = this.fb.group({
    pageNo: [0, Validators.required],
    pageSize: [5, Validators.required],
    filters: [],
  });
  form: FormGroup = this.fb.group({
    categories: '',
  });
  searchCategories(evt: Event | null) {
    if (evt !== null) {
      this.loading = true;
      evt.preventDefault();
      let searchCategory = this.formSearch.value;
      this.categoryService.Search(searchCategory).subscribe((resp) => {
        this.categories = resp.items;
        this.loading = false;
      });
    } else {
      this.loading=true;
      let searchCategory = this.formSearch.value;
      this.categoryService.Search(searchCategory).subscribe((resp) => {
        this.categories = resp.items;
        this.loading=false;
      });
    }
  }
  mostrarModalFunction() {
    this.mostrarModal = true;
  }
  mostrarModalFunctionUpdate(category: Category) {
    this.form.get('categories')?.setValue(category);
    this.mostarModalUpdate = true;
  }
  recibirMostrarModal(valor: boolean) {
    if (!valor) {
      this.searchCategories(null);
      this.form.patchValue({
        idAlimento: 0,
        descripcion: '',
        habitat: '',
      });
      this.mostrarModal = valor;
    }
  }
  recibirMostrarModalUpdate(valor: boolean) {
    if (!valor) {
      this.searchCategories(null);
      this.form.patchValue({
        name: '',
        description: '',
      });
      this.mostarModalUpdate = valor;
    }
  }
  recibirShow(valor: boolean) {
    if (!valor) {
      this.form.patchValue({
        name: '',
        description: '',
      });
      this.visible = valor;
    }
  }
  onPageChange(event: any) {
    this.first = event.rows == event.first ? this.first++ : this.first;
    this.formSearch.patchValue({
      pageNo: 0,
      pageSize: event.rows,
    });
    this.searchCategories(null);
  }
  //delete Category by Id
  removeCategory(categoryId: string) {
    this.categoryService.Delete(categoryId).subscribe((resp) => {
      if (resp.success === true) {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Success',
          detail: 'Se elimino satisfactoriamente',
        });
        this.searchCategories(null);
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
  //Confirm delete Category by Id
  confirmarDelete(categoryId: string) {
    this.confirmationService.confirm({
      message: ' Are you sure you want to delete the Category?',
      accept: () => {
        this.removeCategory(categoryId);
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
  showMostralModal(category: Category) {
    this.visible = true;
    this.showCategory = category;
  }
}
