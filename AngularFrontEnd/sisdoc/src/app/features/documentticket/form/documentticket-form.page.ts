import { Component, inject, OnInit, signal } from '@angular/core';
import { DocumentTicketService } from '../../../core/services/documentticket.service';
import { GlobalStatusService } from '../../../core/services/globalstatus.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateDocumentTicketRequest } from '../../../core/models/documentticket.model'; // Ajusta la ruta a tu archivo de interfaces

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalStatus } from '../../../core/models/globalStatus.model';

@Component({
  selector: 'app-documentticket-form.page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SharedMaterialModule,
    PageHeaderComponent,
    MatDatepickerModule, // <-- Agrégalo aquí
    MatNativeDateModule  // <-- Y aquí (si no lo tienes globalmente)
  ],
  templateUrl: './documentticket-form.page.html',
  styleUrl: './documentticket-form.page.scss',
})
export class DocumentTicketFormPage implements OnInit {

  private readonly documentticketService = inject(DocumentTicketService);
  private readonly globalstatusService = inject(GlobalStatusService);
  private readonly notification = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  globalstatus = signal<GlobalStatus[]>([]);
  isEditMode = false;
  ticketId: number | null = null;
  loading = signal(false);
  loadingData = signal(false);

  form = this.fb.group({
    trackingnumber: ['', [Validators.required, Validators.maxLength(100)]],
    subject: ['', [Validators.required, Validators.maxLength(100)]],
    filingdate: [new Date(), [Validators.required]],
    sendername: ['', [Validators.required]],
    senderidnumber: ['', [Validators.required]],
    globalstatus: ['', [Validators.required]],
    details: this.fb.array([]) 
  });

  get title(): string {
    return this.isEditMode ? 'Editar expediente' : 'Nuevo expediente';
  }

  get description(): string {
    return this.isEditMode ? 'Modifica los datos del expediente' : 'Completa los datos del nuevo expediente';
  }

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  ngOnInit(): void {

    this.loadGlobalStatus();

    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEditMode = true;
      this.ticketId = Number(id);
      this.loadDocumentTicket(this.ticketId);
    }else {
      // Opcional: Agregar un detalle por defecto al crear para que no vaya vacío
      this.addDetail();
    }
  }

  addDetail(): void {
    const detailGroup = this.fb.group({
      count: [0, [Validators.required]],
      stepOrder: [1, [Validators.required]],
      transferredDate: [new Date(), [Validators.required]],
      originDepartment: ['', [Validators.required]],
      targetDepartment: ['', [Validators.required]],
      assignedUser: ['', [Validators.required]],
      remarks: [''],
      movementStatus: ['', [Validators.required]],
      receivedDate: [new Date(), [Validators.required]]
    });
    this.details.push(detailGroup);
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }

    private loadGlobalStatus(): void {
    this.globalstatusService.list({ pageNumber: 1, pageSize: 20 }).subscribe({
      next: (cats) => this.globalstatus.set(cats),
      error: () => this.notification.error("No se pudieron cargar los estados"),
    });
  }

  private loadDocumentTicket(id: number): void {
    this.loadingData.set(true);
    this.documentticketService.getById(id).subscribe({
      next: (documentticket) => {
        this.form.patchValue({
          trackingnumber: documentticket.trackingnumber,
          subject: documentticket.subject,
          filingdate:documentticket.filingdate!,
          sendername:documentticket.sendername!,
          senderidnumber:documentticket.senderidnumber!,
          globalstatus:documentticket.globalstatus!,
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el expediente");
        this.loadingData.set(false);
      }
    });
  }

submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
     const formValues = this.form.getRawValue() as CreateDocumentTicketRequest;

    if (this.isEditMode==false){
      this.documentticketService.create(formValues).subscribe({
        next: () => {
          this.notification.success('Trámite creado exitosamente.');
          this.router.navigate(['/documentticket']);
        },
        error: (error: HttpErrorResponse) => {
          this.notification.error('Ocurrió un error al crear el trámite.');
          this.loading.set(false);
        }
      });
    }
  }
}
