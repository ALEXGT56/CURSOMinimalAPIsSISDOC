import { BaseEntity } from './base-entity.model';

//Respuesta del listado: GET /api/products?PageNumber=&PageSize=&Search=
export interface Product extends BaseEntity {
    name: string;
    description: string;
}

//Request: POST /api/products
export interface CreateProductRequest {
    name: string;
    description: string;
}

//Request: PUT /api/products/{id}
export interface UpdateProductRequest {
    name: string;
    description: string;
}