import { BaseEntity } from './base-entity.model';

export interface Person extends BaseEntity {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface CreatePersonRequest {
   name: string;
    lastName: string;
    email: string;
    phone: string;
    userName: string;
    password: string;
}

export interface UpdatePersonRequest {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface PersonListItem extends BaseEntity {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}