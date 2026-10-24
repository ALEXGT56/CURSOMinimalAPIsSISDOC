import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SharedMaterialModule } from '../../../shared/shared-material.module';
import { HasRoleDirective } from '../../../shared/directives/has-role-directive';
import { PersonService } from '../../../core/services/person.service';
import { NotificationService } from '../../../core/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { PersonListItem } from '../../../core/models/person.model';
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
  templateUrl: './persons-list.page.html',
  styleUrl: './persons-list.page.scss',
})
export class PersonsListPage implements OnInit {

  private readonly PersonService = inject(PersonService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);


  displayedColumns: string[] = ['name', 'lastName', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<PersonListItem>();
  loading = signal(false);
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  searchControl = new FormControl('');

  ngOnInit(): void {

    this.loadPersons();


    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex = 0;
        this.loadPersons();
      });

  }

  loadPersons(): void {
    this.loading.set(true);
    this.PersonService.list({ pageNumber: this.pageIndex + 1, pageSize: this.pageSize, search: this.searchControl.value ?? '' })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response;
          this.totalItems = response.length;
          this.loading.set(false);
        },
        error: () => {
          this.notification.error('Error loading Persons');
          this.loading.set(false);
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPersons();
  }

  editPerson(id: number): void {
    this.router.navigate(['/persons', id, 'edit']);
  }

  confirmDelete(Person: PersonListItem): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Person',
        message: `¿Estás seguro de eliminar "${Person.name}"?. Esta acción no se deshacer.`,
        confirmLabel: 'Eliminar'
      }
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deletePerson(Person.id);
      }
    })
  }

  private deletePerson(id: number): void {
    this.PersonService.delete(id).subscribe({
      next: () => {
        this.notification.success("Person eliminado correctamente");
        this.loadPersons();
      },
      error: () => {
        this.notification.error("Error al eliminar el Person");
      }
    });
  }
}
