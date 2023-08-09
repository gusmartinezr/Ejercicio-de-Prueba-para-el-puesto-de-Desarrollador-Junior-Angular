import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Response } from 'src/app/shared/classes/response';
import { environment } from 'src/environments/environment';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl: string = environment.baseUrl;
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}
  //Get Categories details
  GetCategoryById(categoryId: string): Observable<Response<Category>> {
    const url = `${this.baseUrl}/api/Category/${categoryId}`;
    const params = new HttpParams().set('Id', categoryId);
    return this.http.post<Response<Category>>(url, { params });
  }
  //Crear Category
  CreateCategory(category: any): Observable<Response<any>> {
    const url = `${this.baseUrl}/api/Category`;
    const body = category;
    return this.http.post<Response<any>>(url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  //Search Categories
  Search(search: any): Observable<Response<any>> {
    const url = `${this.baseUrl}/api/Category/Search`;
    const body = search;
    return this.http.post<Response<any>>(url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  //Update Categories
  Update(id: string, category: any): Observable<Response<any>> {
    const url = `${this.baseUrl}/api/Category/${id}`;
    const body = category;
    return this.http.put<Response<any>>(url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  //Delete Category
  Delete(categoryId: string): Observable<Response<boolean>> {
    const url = `${this.baseUrl}/api/Category/${categoryId}/Remove`;
    const params = new HttpParams().set('Id', categoryId);
    return this.http.post<Response<boolean>>(url, { params });
  }
}
