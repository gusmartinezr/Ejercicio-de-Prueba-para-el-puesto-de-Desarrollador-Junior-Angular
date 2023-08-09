import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../classes/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',

})
export class SelectCategoriesComponent {
  private _categoryId: string= '';
  categories: Category[] = [];
  categories2:Category[]=[];
  categoriesSugeridas: Category[] = [];
  @Input() set categoryIdInput(categoryRecibido: string) {
    if (categoryRecibido && categoryRecibido !=null ) {
      this._categoryId= categoryRecibido;
      this.cambiarCategory();
    }
  }
  @Output() categoryOutput: EventEmitter<Category> = new EventEmitter<Category>();

  form: FormGroup = this.fb.group({
    category: [new Category()],
  });
  formSearch: FormGroup = this.fb.group({
    pageNo: [0,Validators.required],
    pageSize:[1000000,Validators.required],
    filters:[]
});
  constructor(private fb: FormBuilder, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.searchCategories();
    this.form.get('category')?.valueChanges.subscribe((category) => {
      this.categoryOutput.emit(category);
    });
  }

  cambiarCategory(): void {
    let category = this.categories.find(
      (category) => category.id == this._categoryId
    );
    if (category) {
      this.form.reset({
        category: category,
      });
    }
  }
  //Obtener Category
  searchCategories() {
      let searchCategory = this.formSearch.value;
      this.categoryService.Search(searchCategory).subscribe((resp) => {
        this.categories=resp.items;
        this.categories2=resp.items;
        this.form.reset({
                category: this.categories2[0],
              });
      });
  }
  //Método que sirve para cargar lista temporal para hacer sugerencias, si utiliza el buscador del componente.
  cargarCategoriesSugeridas(event: any) {
    let categoriesSugeridas: Category[] = [];
    let query = event.query;
    for (let i = 0; i < this.categories.length; i++) {
      let category = this.categories[i];
      if (
        category.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .search(query.toLowerCase()) != -1
      ) {
        categoriesSugeridas.push(category);
      }
    }
    this.categoriesSugeridas = categoriesSugeridas;
  }
}
