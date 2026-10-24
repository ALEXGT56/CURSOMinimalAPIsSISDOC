import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { DocumentTicketService } from '../../../core/services/documentticket.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentTicket } from '../../../core/models/documentticket.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { PageEvent } from '@angular/material/paginator';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-documentticket-list.page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    SharedMaterialModule,
    HasRoleDirective,
    EmptyStateComponent,
    PageHeaderComponent
  ],
  templateUrl: './documentticket-list.page.html',
  styleUrl: './documentticket-list.page.scss',
})
export class DocumentTicketListPage implements OnInit {

  private readonly documentticketService = inject(DocumentTicketService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);


  displayedColumns: string[] = ['trackingnumber', 'subject','filingdate','sendername','senderidnumber','globalstatus', 'actions'];
  dataSource = new MatTableDataSource<DocumentTicket>();
  loading = signal(false);
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  searchControl = new FormControl('');

  ngOnInit(): void {

    this.loadDocumentTicket();


    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadDocumentTicket();
      });

  }

  loadDocumentTicket(): void {
    this.loading.set(true);
    this.documentticketService.list({ pageNumber: this.pageIndex + 1, pageSize: this.pageSize, search: this.searchControl.value ?? '' })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.totalItems = response.length;
          this.loading.set(false);
        },
        error: () => {
          this.notification.error('Error loading documentticket');
          this.loading.set(false);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDocumentTicket();
  }

  editDocumentTicket(id: number): void {
    this.router.navigate(['/documentticket', id, 'edit']);
  }

  confirmDelete(documentticket: DocumentTicket): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar estado',
        message: `¿Estás seguro de eliminar "${documentticket.trackingnumber}"?. Esta acción no se deshacer.`,
        confirmLabel: 'Eliminar'
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteDocumentTicket(documentticket.id);
      }
    })
  }

  private deleteDocumentTicket(id: number): void {
    this.documentticketService.delete(id).subscribe({
      next: () => {
        this.notification.success("Estado eliminado correctamente");
        this.loadDocumentTicket();
      },
      error: () => {
        this.notification.error("Error al eliminar el estado");
      }
    });
  }
}
