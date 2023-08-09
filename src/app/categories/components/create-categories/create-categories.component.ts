import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  providers:[MessageService,ConfirmationService],
})
export class CreateCategoriesComponent {
  cargando: boolean = false;
  mostrarModal: boolean = false;
  @Input() set mostrarModalInput(mostrarModal: boolean) {
    if (mostrarModal) {
      this.mostrarModal = mostrarModal;
    }
  }
  @Output() mostrarModalOutput: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  createCategory(evt: Event) {
    evt.preventDefault();
    let category = this.form.value;
    this.categoryService.CreateCategory(category).subscribe((resp) => {
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
      message: 'Are you sure you want to save the category?',
      accept: () => {
        this.cargando = true;
        setTimeout(() => this.createCategory(evt), 1000);
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
        name: '',
        description: '',
      });
    }
  }
}
