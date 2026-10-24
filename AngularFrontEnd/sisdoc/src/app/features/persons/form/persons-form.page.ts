import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonService } from '../../../core/services/person.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-persons-form.page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SharedMaterialModule,
    PageHeaderComponent
  ],
  templateUrl: './persons-form.page.html',
  styleUrl: './persons-form.page.scss',
})
export class personsFormPage implements OnInit {

  private readonly personService = inject(PersonService);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);


  isEditMode = false;
  personId: number | null = null;
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
    return this.isEditMode ? 'Editar persona' : 'Nuevo persona';
  }

  get description(): string {
    return this.isEditMode ? 'Modifica los datos del persona' : 'Completa los datos del nueva persona';
  }

  ngOnInit(): void {

 
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEditMode = true;
      this.personId = Number(id);
      this.loadperson(this.personId);
    }
  }

 

  private loadperson(id: number): void {
    this.loadingData.set(true);
    this.personService.getById(id).subscribe({
      next: (person) => {
        this.form.patchValue({
          name: person.name,
          lastName: person.lastName,
          email: person.email,
          phone: person.phone
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el person");
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
      ? this.personService.update(this.personId!, request)
      : this.personService.create(request);

    operation$.subscribe({
      next: () => {
        this.loading.set(false);
        this.notification.success(this.isEditMode ? 'person actualizado correctamente' : 'person creado correctamente');
        this.router.navigate(['/persons']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        const msg = err.error?.message ?? 'Error al guardar el person';
        this.notification.error(msg);
      }
    })
  }
}
