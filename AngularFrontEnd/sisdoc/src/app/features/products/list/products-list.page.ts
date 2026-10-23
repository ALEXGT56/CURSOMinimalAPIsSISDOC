import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../core/models/product.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state';
import { PageEvent } from '@angular/material/paginator';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-products-list.page',
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
  templateUrl: './products-list.page.html',
  styleUrl: './products-list.page.scss',
})
export class ProductsListPage implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);


  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  loading = signal(false);
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  searchControl = new FormControl('');

  ngOnInit(): void {

    this.loadProducts();


    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadProducts();
      });

  }

  loadProducts(): void {
    this.loading.set(true);
    this.productService.list({ pageNumber: this.pageIndex + 1, pageSize: this.pageSize, search: this.searchControl.value ?? '' })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.totalItems = response.length;
          this.loading.set(false);
        },
        error: () => {
          this.notification.error('Error loading products');
          this.loading.set(false);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  editProduct(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
  }

  confirmDelete(product: Product): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar producto',
        message: `¿Estás seguro de eliminar "${product.name}"?. Esta acción no se deshacer.`,
        confirmLabel: 'Eliminar'
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct(product.id);
      }
    })
  }

  private deleteProduct(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => {
        this.notification.success("Producto eliminado correctamente");
        this.loadProducts();
      },
      error: () => {
        this.notification.error("Error al eliminar el producto");
      }
    });
  }
}
