import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FeatherIconDirective } from '../shared/directives/feather-icon.directive';
import { HelperService } from '../core/services/helper.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  standalone: true,
  imports: [MatButtonModule, FeatherIconDirective],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  userEmail: string | null = null;

  private auth = inject(AuthService);
  private router = inject(Router);
  private helperService = inject(HelperService);

  ngOnInit(): void {
    this.userEmail = this.auth.getUserEmail();
  }

  onLogout(): void {
    this.helperService.logout();
  }

  goToDepartments(): void {
    this.router.navigate(['/list']);
  }
}
