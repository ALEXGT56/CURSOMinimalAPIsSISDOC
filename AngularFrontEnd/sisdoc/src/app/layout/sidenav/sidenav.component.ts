import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '../../shared/directives/has-role-directive';
import { AuthService } from '../../core/services/auth.service';

interface NavItem{
  label: string;
  icon: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatDividerModule, HasRoleDirective],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  protected readonly auth = inject(AuthService);

  readonly navItems: NavItem[] = [
    {label: 'Dashboard', icon: 'dashboard', route: '/dashboard'},
    {label: 'GlobalStatus', icon: 'inventory_2', route: '/globalstatus'},
    {label: 'Orders', icon: 'shopping_cart', route: '/orders'},
    {label: 'Customers', icon: 'people', route: '/customers'},
    {label: 'Admin Panel', icon: 'admin_panel_settings', route: '/admin', adminOnly: true}
  ]
}
