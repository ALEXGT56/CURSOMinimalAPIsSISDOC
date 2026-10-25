import { BaseEntity } from './base-entity.model';

//Respuesta del listado: GET /api/globalstatus?PageNumber=&PageSize=&Search=
export interface DocumentTicket extends BaseEntity {
    trackingnumber: string;
    subject: string;
    filingdate: Date;
    sendername: string;
    senderidnumber: string;
    globalstatus: string;
}

//Request: POST /api/globalstatus
export interface DocumentTicketDetailRequest {
    count: number;
    stepOrder: number;
    transferredDate: Date;
    originDepartment: string;
    targetDepartment: string;
    assignedUser: string;
    remarks?: string;
    movementStatus: string;
    receivedDate: Date;
}

export interface CreateDocumentTicketRequest {
    trackingnumber: string;
    subject: string;
    filingdate: Date;
    sendername: string;
    senderidnumber: string;
    globalstatus: string;
    details: DocumentTicketDetailRequest[]; // <-- Agregado aquí como arreglo
}

//Request: PUT /api/globalstatus/{id}
export interface UpdateDocumentTicketRequest {
     trackingnumber: string;
    subject: string;
    filingdate: Date;
    sendername: string;
    senderidnumber: string;
    globalstatus: string;
}