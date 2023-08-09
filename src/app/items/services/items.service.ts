import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/shared/classes/response';
import { Item } from '../classes/item';
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private baseUrl: string = environment.baseUrl;
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}
  //Get Items details
  GetItemById(itemId: string): Observable<Response<Item>> {
    const url = `${this.baseUrl}/api/Item/${itemId}`;
    const params = new HttpParams().set('Id', itemId);
    return this.http.post<Response<Item>>(url, { params });
  }
  //Search Items
  SearchItems(search: any): Observable<Response<any>> {
    const url = `${this.baseUrl}/api/Item/Search`;
    const body = search;
    return this.http.post<Response<any>>(url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  //Crear Item
  CreateItem(item: any): Observable<Response<any>> {
    const url = `${this.baseUrl}/api/Item`;
    const body = item;
    return this.http.post<Response<any>>(url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  //Update Items
  UpdateItem(id: string, item: any): Observable<Response<any>> {
    const url = `${this.baseUrl}/api/Item/${id}`;
    const body = item;
    return this.http.put<Response<any>>(url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  //Delete Item
  DeleteItem(itemId: string): Observable<Response<boolean>> {
    const url = `${this.baseUrl}/api/Item/${itemId}/Remove`;
    const params = new HttpParams().set('Id', itemId);
    return this.http.post<Response<boolean>>(url, { params });
  }
}
