import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServiceFactory } from './api-service-factory';
import { API_ROUTES } from '../constants/api-routes.constants';
import { PagedRequest } from '../models/paged.model';
import { map, Observable } from 'rxjs';
import { CreateCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.model';
import { ApiResult } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly factory = inject(ApiServiceFactory);

  private get baseUrl(): string {
    return this.factory.create(API_ROUTES.CATEGORIES.BASE).url;
  }

  list(request: PagedRequest): Observable<Category[]> {

    const params = new HttpParams()
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('search', request.search ?? '');

    return this.http
      .get<ApiResult<Category[]>>(this.baseUrl, { params })
      .pipe(
        map((result) => result.value ?? [] as Category[]))
  }

  getById(id: number): Observable<Category> {
    return this.http
      .get<ApiResult<Category>>(`${this.baseUrl}/${id}`)
      .pipe(
        map((result) => result.value!))
  }

  create(request: CreateCategoryRequest): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl, request);
  }

  update(id: number, request: UpdateCategoryRequest): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(`${this.baseUrl}/${id}`);
  }
}
