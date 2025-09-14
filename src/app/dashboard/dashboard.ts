import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FeatherIconDirective } from '../shared/directives/feather-icon.directive';

@Component({
  standalone: true,
  imports: [MatButtonModule, FeatherIconDirective],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
