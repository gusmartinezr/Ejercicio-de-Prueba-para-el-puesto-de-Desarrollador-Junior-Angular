import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../services/items.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Category } from 'src/app/categories/classes/category';
@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  providers: [MessageService, ConfirmationService],
})
export class CreateItemsComponent {
  cargando: boolean = false;
  mostrarModal: boolean = false;
  categoryIdRecibido: string = '';
  categoryNameRecibido: string = '';
  @Input() set mostrarModalInput(mostrarModal: boolean) {
    if (mostrarModal) {
      this.mostrarModal = mostrarModal;
    }
  }
  @Output() mostrarModalOutput: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  form: FormGroup = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    categoryId: ['', Validators.required],
    defaultPrice: [0, Validators.required],
    defaultCost: [0, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private itemService: ItemsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  createItem(evt: Event) {
    evt.preventDefault();
    let item = this.form.value;
    this.itemService.CreateItem(item).subscribe((resp) => {
      if (resp.success === true) {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Success',
          detail: 'Se agrego correctamente',
        });
        this.cargando = false;
        this.emitirMostrarModal();
        return;
      } else {
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          summary: 'Error',
          detail: resp.message,
        });
        this.cargando = false;
        this.emitirMostrarModal();
        return;
      }
    });
  }
  confirmar(evt: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to save the item?',
      accept: () => {
        this.cargando = true;
        setTimeout(() => this.createItem(evt), 1000);
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
  emitirMostrarModal(evt?: Event) {
    evt?.preventDefault();
    this.mostrarModal = false;
    if (!this.mostrarModal) {
      this.mostrarModalOutput.emit(this.mostrarModal);
      this.form.patchValue({
        id: 0,
        code: '',
        name: '',
        description: '',
        category: '',
        defaultPrice: 0,
        defaultCost: 0,
      });
    }
  }
  recibirCategories(category: Category) {
    this.categoryIdRecibido = category.id;
    this.categoryNameRecibido = category.name;
    if (category && category.id != null) {
      this.form.get('categoryId')?.patchValue(category.id);
    }
  }
}
