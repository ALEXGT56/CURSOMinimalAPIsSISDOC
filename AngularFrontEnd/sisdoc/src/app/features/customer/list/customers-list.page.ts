import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { CustomerService } from '../../../core/services/customer.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerListItem } from '../../../core/models/customer.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { PageEvent } from '@angular/material/paginator';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-Customers-list.page',
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
  templateUrl: './customers-list.page.html',
  styleUrl: './customers-list.page.scss',
})
export class CustomersListPage implements OnInit {

  private readonly CustomerService = inject(CustomerService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);


  displayedColumns: string[] = ['name', 'lastName', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<CustomerListItem>();
  loading = signal(false);
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  searchControl = new FormControl('');

  ngOnInit(): void {

    this.loadCustomers();


    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadCustomers();
      });

  }

  loadCustomers(): void {
    this.loading.set(true);
    this.CustomerService.list({ pageNumber: this.pageIndex + 1, pageSize: this.pageSize, search: this.searchControl.value ?? '' })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.totalItems = response.length;
          this.loading.set(false);
        },
        error: () => {
          this.notification.error('Error loading Customers');
          this.loading.set(false);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCustomers();
  }

  editCustomer(id: number): void {
    this.router.navigate(['/Customers', id, 'edit']);
  }

  confirmDelete(Customer: CustomerListItem): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Customero',
        message: `¿Estás seguro de eliminar "${Customer.name}"?. Esta acción no se deshacer.`,
        confirmLabel: 'Eliminar'
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteCustomer(Customer.id);
      }
    })
  }

  private deleteCustomer(id: number): void {
    this.CustomerService.delete(id).subscribe({
      next: () => {
        this.notification.success("Customero eliminado correctamente");
        this.loadCustomers();
      },
      error: () => {
        this.notification.error("Error al eliminar el Customero");
      }
    });
  }
}
