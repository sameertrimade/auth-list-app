import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-error-block',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './error-block.html',
  styleUrl: './error-block.scss',
})
export class ErrorBlockComponent {
  @Input() message = 'Something went wrong. Please try again.';
}
