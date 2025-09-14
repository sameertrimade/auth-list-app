import { Directive, ElementRef, inject, Input, OnChanges } from '@angular/core';
import feather from 'feather-icons';

type FeatherIconName = keyof typeof feather.icons;

@Directive({
  selector: '[appFeatherIcon]',
  standalone: true,
})
export class FeatherIconDirective implements OnChanges {
  @Input('appFeatherIcon') iconName!: FeatherIconName;
  @Input() width?: number;
  @Input() height?: number;

  private el = inject(ElementRef<HTMLElement>);

  ngOnChanges(): void {
    const icon = feather.icons[this.iconName];
    if (icon)
      this.el.nativeElement.innerHTML = icon.toSvg({
        width: this.width ?? 24,
        height: this.height ?? 24,
      });
  }
}
