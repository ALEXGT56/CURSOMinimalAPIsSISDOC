import { Component, inject, OnInit, signal } from '@angular/core';
import { GlobalStatusService } from '../../../core/services/globalstatus.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GlobalStatus } from '../../../core/models/globalStatus.model';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';

@Component({
  selector: 'app-products-detail.page',
  standalone: true,
  imports: [CommonModule, RouterLink,SharedMaterialModule, PageHeaderComponent, HasRoleDirective],
  templateUrl: './globalstatus-detail.page.html',
  styleUrl: './globalstatus-detail.page.scss',
})
export class GlobalStatusDetailPage implements OnInit {

  private readonly globalstatusService = inject(GlobalStatusService);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  globalstatus = signal<GlobalStatus | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.globalstatusService.getById(id).subscribe({
      next: (prod) => {
        this.globalstatus.set(prod);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el estado");
        this.loading.set(false);
      }
    });

  }


}
