import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { GlobalStatusService } from '../../../core/services/globalstatus.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalStatus } from '../../../core/models/globalStatus.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { PageEvent } from '@angular/material/paginator';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-globalstatus-list.page',
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
  templateUrl: './globalstatus-list.page.html',
  styleUrl: './globalstatus-list.page.scss',
})
export class GlobalStatusListPage implements OnInit {

  private readonly globalstatusService = inject(GlobalStatusService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);


  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<GlobalStatus>();
  loading = signal(false);
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  searchControl = new FormControl('');

  ngOnInit(): void {

    this.loadGlobalStatus();


    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadGlobalStatus();
      });

  }

  loadGlobalStatus(): void {
    this.loading.set(true);
    this.globalstatusService.list({ pageNumber: this.pageIndex + 1, pageSize: this.pageSize, search: this.searchControl.value ?? '' })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.totalItems = response.length;
          this.loading.set(false);
        },
        error: () => {
          this.notification.error('Error loading globalstates');
          this.loading.set(false);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadGlobalStatus();
  }

  editGlobalStatus(id: number): void {
    this.router.navigate(['/globalstatus', id, 'edit']);
  }

  confirmDelete(globalstatus: GlobalStatus): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar estado',
        message: `¿Estás seguro de eliminar "${globalstatus.name}"?. Esta acción no se deshacer.`,
        confirmLabel: 'Eliminar'
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteGlobalStatus(globalstatus.id);
      }
    })
  }

  private deleteGlobalStatus(id: number): void {
    this.globalstatusService.delete(id).subscribe({
      next: () => {
        this.notification.success("Estado eliminado correctamente");
        this.loadGlobalStatus();
      },
      error: () => {
        this.notification.error("Error al eliminar el estado");
      }
    });
  }
}
