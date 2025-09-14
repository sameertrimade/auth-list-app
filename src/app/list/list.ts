import { Component, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FeatherIconDirective } from '../shared/directives/feather-icon.directive';
import { Department } from '../shared/models/department.model';
import { HelperService } from '../core/services/helper.service';
import { ApiService } from '../core/services/api.service';
import { finalize } from 'rxjs';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner';
import { ErrorBlockComponent } from '../shared/components/error-block/error-block';
import { EmptyStateComponent } from '../shared/components/empty-state/empty-state';

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
})
export class ListComponent implements OnInit {
  departments = signal<Department[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private helperService = inject(HelperService);
  private router = inject(Router);
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    (this.isLoading.set(true),
      this.api
        .getDepartments()
        .pipe(
          finalize(() => this.isLoading.set(false)),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe({
          next: (data) => this.departments.set(data),
          error: (err) => this.error.set('Failed to load departments. Please try again.'),
        }));
  }

  onLogout(): void {
    this.helperService.logout();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
