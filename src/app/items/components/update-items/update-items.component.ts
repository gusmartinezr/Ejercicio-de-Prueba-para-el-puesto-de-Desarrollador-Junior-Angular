import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../classes/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  providers: [MessageService, ConfirmationService],
})
export class UpdateItemsComponent {
  cargando: boolean = false;
  mostrarModal: boolean = false;
  showProgressBar = true;
  id: string = '';
  intervalId: any;
  @Input() set mostrarModalUpdate(mostrarModal: boolean) {
    if (mostrarModal) {
      this.mostrarModal = mostrarModal;
      this.showProgressBar = true;
      setInterval(() => {
        this.showProgressBar = false;
      }, 3000);
    }
  }
  @Input() set itemInput(itemRecibido: Item) {
    if (itemRecibido && itemRecibido.id != null) {
      this.id = itemRecibido.id;
      this.form.patchValue({
        code: itemRecibido.code,
        name: itemRecibido.name,
        categoryId: itemRecibido.categoryId,
        description: itemRecibido.description,
        defaultPrice: itemRecibido.defaultPrice,
        defaultCost: itemRecibido.defaultCost,
      });
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

  UpdateItem(evt: Event) {
    evt.preventDefault();
    let item = this.form.value;
    this.itemService.UpdateItem(this.id, item).subscribe((resp) => {
      if (resp.success === true) {
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Success',
          detail: 'Se editó correctamente',
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
      message: 'Are you sure you want to edit this item?',
      accept: () => {
        this.cargando = true;
        setTimeout(() => this.UpdateItem(evt), 1000);
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
        categoryId: '',
        defaultPrice: 0,
        defaultCost: 0,
      });
    }
  }
}
