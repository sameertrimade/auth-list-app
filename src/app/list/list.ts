import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FeatherIconDirective } from '../shared/directives/feather-icon.directive';
import { HelperService } from '../core/services/helper.service';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner';
import { ErrorBlockComponent } from '../shared/components/error-block/error-block';
import { EmptyStateComponent } from '../shared/components/empty-state/empty-state';
import { DepartmentStore } from './list.store';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    FeatherIconDirective,
    MatListModule,
    LoadingSpinnerComponent,
    ErrorBlockComponent,
    EmptyStateComponent,
  ],
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  providers: [DepartmentStore],
})
export class ListComponent {
  readonly store = inject(DepartmentStore);

  private helperService = inject(HelperService);
  private router = inject(Router);

  onLogout(): void {
    this.helperService.logout();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
