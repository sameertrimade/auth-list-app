import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FeatherIconDirective } from '../shared/directives/feather-icon.directive';
import { Department } from '../shared/models/department.model';

@Component({
  standalone: true,
  imports: [MatButtonModule, FeatherIconDirective, MatListModule],
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListComponent implements OnInit {
  departments: Signal<Department[]> = signal<Department[]>([
    {
      id: 1,
      name: 'Cardiology',
      description:
        'Specializes in diagnosing and treating diseases of the heart and blood vessels.',
    },
    {
      id: 2,
      name: 'Pediatrics',
      description: 'Provides healthcare for infants, children, and adolescents.',
    },
    {
      id: 3,
      name: 'Orthopedics',
      description: 'Focuses on conditions involving the musculoskeletal system.',
    },
  ]);

  ngOnInit() {}
}
