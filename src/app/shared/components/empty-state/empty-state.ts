// shared/components/empty-state/empty-state.component.ts
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FeatherIconDirective } from '../../directives/feather-icon.directive';

@Component({
  standalone: true,
  selector: 'app-empty-state',
  imports: [MatIconModule, FeatherIconDirective],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyStateComponent {
  @Input() title = 'No data available';
  @Input() subtitle = 'Please add some items to get started.';
}
