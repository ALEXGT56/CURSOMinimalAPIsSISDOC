import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customers-detail.page',
  standalone: true,
  imports: [CommonModule, RouterLink,SharedMaterialModule, PageHeaderComponent, HasRoleDirective],
  templateUrl: './customers-detail.page.html',
  styleUrl: './customers-detail.page.scss',
})
export class customersDetailPage implements OnInit {

  private readonly customerService = inject(CustomerService);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  customer = signal<Customer | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.customerService.getById(id).subscribe({
      next: (prod) => {
        this.customer.set(prod);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el customero");
        this.loading.set(false);
      }
    });

  }


}
