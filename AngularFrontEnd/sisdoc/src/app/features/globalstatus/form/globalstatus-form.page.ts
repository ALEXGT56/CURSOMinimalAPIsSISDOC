import { Component, inject, OnInit, signal } from '@angular/core';
import { GlobalStatusService } from '../../../core/services/globalstatus.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
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
  templateUrl: './globalstatus-form.page.html',
  styleUrl: './globalstatus-form.page.scss',
})
export class GlobalStatusFormPage implements OnInit {

  private readonly globalstatusService = inject(GlobalStatusService);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  isEditMode = false;
  globalstatusId: number | null = null;
  loading = signal(false);
  loadingData = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
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
      this.globalstatusId = Number(id);
      this.loadGlobalStatus(this.globalstatusId);
    }
  }

  private loadGlobalStatus(id: number): void {
    this.loadingData.set(true);
    this.globalstatusService.getById(id).subscribe({
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
    };

    this.loading.set(true);

    const operation$ = this.isEditMode
      ? this.globalstatusService.update(this.globalstatusId!, request)
      : this.globalstatusService.create(request);

    operation$.subscribe({
      next: () => {
        this.loading.set(false);
        this.notification.success(this.isEditMode ? 'Estado actualizado correctamente' : 'Estado creado correctamente');
        this.router.navigate(['/globalstatus']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        const msg = err.error?.message ?? 'Error al guardar el estado';
        this.notification.error(msg);
      }
    })
  }
}
