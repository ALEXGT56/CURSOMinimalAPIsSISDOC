import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../../../core/services/customer.service';
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
  selector: 'app-customers-form.page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SharedMaterialModule,
    PageHeaderComponent
  ],
  templateUrl: './customers-form.page.html',
  styleUrl: './customers-form.page.scss',
})
export class customersFormPage implements OnInit {

  private readonly customerService = inject(CustomerService);
  private readonly categoryService = inject(CategoryService);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  categories = signal<Category[]>([]);
  isEditMode = false;
  customerId: number | null = null;
  loading = signal(false);
  loadingData = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    lastName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(20)]],
    userName: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.maxLength(25)]],
  });

  get title(): string {
    return this.isEditMode ? 'Editar customero' : 'Nuevo customero';
  }

  get description(): string {
    return this.isEditMode ? 'Modifica los datos del customero' : 'Completa los datos del nuevo customero';
  }

  ngOnInit(): void {

    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEditMode = true;
      this.customerId = Number(id);
      this.loadcustomer(this.customerId);
    }
  }

  private loadCategories(): void {
    this.categoryService.list({ pageNumber: 1, pageSize: 20 }).subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => this.notification.error("No se pudieron cargar las categorias"),
    });
  }

  private loadcustomer(id: number): void {
    this.loadingData.set(true);
    this.customerService.getById(id).subscribe({
      next: (customer) => {
        this.form.patchValue({
          name: customer.name,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el customero");
        this.loadingData.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const value = this.form.value;
    const request = {
      name: value.name!,
      lastName: value.lastName!,
      phone:  value.phone!,
      email:  value.email!,
      userName: value.userName!,
      password: value.password!
    };

    this.loading.set(true);

    const operation$ = this.isEditMode
      ? this.customerService.update(this.customerId!, request)
      : this.customerService.create(request);

    operation$.subscribe({
      next: () => {
        this.loading.set(false);
        this.notification.success(this.isEditMode ? 'customero actualizado correctamente' : 'customero creado correctamente');
        this.router.navigate(['/customers']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        const msg = err.error?.message ?? 'Error al guardar el customero';
        this.notification.error(msg);
      }
    })
  }
}
