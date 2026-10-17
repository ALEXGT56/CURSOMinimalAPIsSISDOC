import { BaseEntity } from './base-entity.model';

export interface Customer extends BaseEntity {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface CreateCustomerRequest {
   name: string;
    lastName: string;
    email: string;
    phone: string;
    userName: string;
    password: string;
}

export interface UpdateCustomerRequest {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface CustomerListItem extends BaseEntity {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}