import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../classes/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
})
export class ShowCategoriesComponent {
  visible: boolean=false;
  name:string='';
  description:string='';
  @Input() set mostrarModalShow(mostrarShow:boolean){
    if(mostrarShow){
      this.visible=mostrarShow;
    }
  }
  @Input() set categoryInput(categoryId: Category) {
    if (categoryId!=null) {
     this.name=categoryId.name;
     this.description=categoryId.description;
    }
  }
  @Output() mostrarModalOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['',Validators.required]
  });
  constructor(  
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoriesService,
  ) { }

  showDialog(evt?: Event) {
    this.visible = false;
    if (!this.visible) {
      this.mostrarModalOutput.emit(this.visible);
      this.form.patchValue({
        name: '',
        description: '',
      });
    }
  }
}
