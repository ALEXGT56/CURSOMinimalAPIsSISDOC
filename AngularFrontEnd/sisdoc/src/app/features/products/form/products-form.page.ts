import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { Category } from '../../../core/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products-form.page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SharedMaterialModule,
    PageHeaderComponent
  ],
  templateUrl: './products-form.page.html',
  styleUrl: './products-form.page.scss',
})
export class ProductsFormPage implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  categories = signal<Category[]>([]);
  isEditMode = false;
  productId: number | null = null;
  loading = signal(false);
  loadingData = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    categoryId: [null as number | null, [Validators.required]],
    price: [null as number | null, [Validators.required, Validators.min(0.01)]],
    stock: [null as number | null, [Validators.required, Validators.min(0)]]
  });

  get title(): string {
    return this.isEditMode ? 'Editar estado' : 'Nuevo estado';
  }

  get description(): string {
    return this.isEditMode ? 'Modifica los datos del estado' : 'Completa los datos del nuevo estado';
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEditMode = true;
      this.productId = Number(id);
      this.loadProduct(this.productId);
    }
  }

  private loadProduct(id: number): void {
    this.loadingData.set(true);
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.form.patchValue({
          name: product.name,
          description: product.description,
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el estado");
        this.loadingData.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.value;
    const request = {
      name: value.name!,
      description: value.description!,
      categoryId: Number(value.categoryId),
      price: Number(value.price),
      stock: Number(value.stock),
    };

    this.loading.set(true);

    const operation$ = this.isEditMode
      ? this.productService.update(this.productId!, request)
      : this.productService.create(request);

    operation$.subscribe({
      next: () => {
        this.loading.set(false);
        this.notification.success(this.isEditMode ? 'Estado actualizado correctamente' : 'Estado creado correctamente');
        this.router.navigate(['/products']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        const msg = err.error?.message ?? 'Error al guardar el estado';
        this.notification.error(msg);
      }
    })
  }
}
