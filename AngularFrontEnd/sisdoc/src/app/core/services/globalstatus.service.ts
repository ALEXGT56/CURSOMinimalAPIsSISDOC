import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServiceFactory } from './api-service-factory';
import { API_ROUTES } from '../constants/api-routes.constants';
import { PagedRequest } from '../models/paged.model';
import { map, Observable } from 'rxjs';
import { AddGlobalStatusRequest, GlobalStatus, UpdateGlobalStatusRequest } from '../models/globalStatus.model';
import { ApiResult } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStatusService {
  private readonly http = inject(HttpClient);
  private readonly factory = inject(ApiServiceFactory);

  private get baseUrl(): string {
    return this.factory.create(API_ROUTES.GLOBALSTATUS.BASE).url;
  }

  list(request: PagedRequest): Observable<GlobalStatus[]> {

    const params = new HttpParams()
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('search', request.search ?? '');

    return this.http
      .get<ApiResult<GlobalStatus[]>>(this.baseUrl, { params })
      .pipe(
        map((result) => result.value ?? [] as GlobalStatus[]))
  }

  getById(id: number): Observable<GlobalStatus> {
    return this.http
      .get<ApiResult<GlobalStatus>>(`${this.baseUrl}/${id}`)
      .pipe(
        map((result) => result.value!))
  }

  create(request: AddGlobalStatusRequest): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl, request);
  }

  update(id: number, request: UpdateGlobalStatusRequest): Observable<ApiResult> {
    return this.http.put<ApiResult>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(`${this.baseUrl}/${id}`);
  }
}
