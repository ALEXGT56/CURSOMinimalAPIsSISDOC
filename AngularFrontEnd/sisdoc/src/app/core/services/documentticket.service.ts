import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServiceFactory } from './api-service-factory';
import { API_ROUTES } from '../constants/api-routes.constants';
import { PagedRequest } from '../models/paged.model';
import { map, Observable } from 'rxjs';
import { CreateDocumentTicketRequest, DocumentTicket, UpdateDocumentTicketRequest } from '../models/documentticket.model';
import { ApiResult } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentTicketService {
  private readonly http = inject(HttpClient);
  private readonly factory = inject(ApiServiceFactory);

  private get baseUrl(): string {
    return this.factory.create(API_ROUTES.DOCUMENTTICKET.BASE).url;
  }

  list(request: PagedRequest): Observable<DocumentTicket[]> {

    const params = new HttpParams()
      .set('pageNumber', request.pageNumber.toString())
      .set('pageSize', request.pageSize.toString())
      .set('search', request.search ?? '');

    return this.http
      .get<ApiResult<DocumentTicket[]>>(this.baseUrl, { params })
      .pipe(
        map((result) => result.value ?? [] as DocumentTicket[]))
  }

  getById(id: number): Observable<DocumentTicket> {
    return this.http
      .get<ApiResult<DocumentTicket>>(`${this.baseUrl}/${id}`)
      .pipe(
        map((result) => result.value!))
  }

  create(request: CreateDocumentTicketRequest): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.baseUrl, request);
  }

  update(id: number, request: UpdateDocumentTicketRequest): Observable<ApiResult> {
    return this.http.put<ApiResult>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(`${this.baseUrl}/${id}`);
  }
}
