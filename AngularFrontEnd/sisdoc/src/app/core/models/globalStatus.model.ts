import { BaseEntity } from './base-entity.model';

//Respuesta del listado: GET /api/products?PageNumber=&PageSize=&Search=
export interface GlobalStatus extends BaseEntity {
    name: string;
    description: string;
}

//Request: POST /api/products
export interface AddGlobalStatusRequest {
    name: string;
    description: string;
}

//Request: PUT /api/products/{id}
export interface UpdateGlobalStatusRequest {
    name: string;
    description: string;
}