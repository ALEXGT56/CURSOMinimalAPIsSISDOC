import { BaseEntity } from './base-entity.model';

export interface Category extends BaseEntity {
    name: string;
}

export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest {
    name: string;
}