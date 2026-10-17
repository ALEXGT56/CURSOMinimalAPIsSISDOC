import { BaseEntity } from './base-entity.model';

//Respuesta del listado: GET /api/globalstatus?PageNumber=&PageSize=&Search=
export interface GlobalStatus extends BaseEntity {
    name: string;
    description: string;
}

//Request: POST /api/globalstatus
export interface AddGlobalStatusRequest {
    name: string;
    description: string;
}

//Request: PUT /api/globalstatus/{id}
export interface UpdateGlobalStatusRequest {
    name: string;
    description: string;
}