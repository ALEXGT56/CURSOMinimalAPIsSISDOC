import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';

@Component({
  selector: 'app-products-detail.page',
  standalone: true,
  imports: [CommonModule, RouterLink,SharedMaterialModule, PageHeaderComponent, HasRoleDirective],
  templateUrl: './products-detail.page.html',
  styleUrl: './products-detail.page.scss',
})
export class ProductsDetailPage implements OnInit {

  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  product = signal<Product | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.productService.getById(id).subscribe({
      next: (prod) => {
        this.product.set(prod);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el producto");
        this.loading.set(false);
      }
    });

  }


}
