import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-shell.component',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, ToolbarComponent, SidenavComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObs = inject(BreakpointObserver);

  isHandset = this.breakpointObs.isMatched(Breakpoints.Handset);

  toggleSidenav(): void{
    this.sidenav.toggle();
  }
}
