import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { PersonService } from '../../../core/services/person.service';
import { Person } from '../../../core/models/person.model';

@Component({
  selector: 'app-persons-detail.page',
  standalone: true,
  imports: [CommonModule, RouterLink,SharedMaterialModule, PageHeaderComponent, HasRoleDirective],
  templateUrl: './persons-detail.page.html',
  styleUrl: './persons-detail.page.scss',
})
export class personsDetailPage implements OnInit {

  private readonly personService = inject(PersonService);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  person = signal<Person | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.personService.getById(id).subscribe({
      next: (prod) => {
        this.person.set(prod);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error("Error al cargar el customero");
        this.loading.set(false);
      }
    });

  }


}
