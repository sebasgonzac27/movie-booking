import { Component } from '@angular/core';
import { XComponent } from '../../icons/x/x.component';

@Component({
  selector: 'app-chip',
  imports: [XComponent],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  handleRemove(): void {
    console.log('Removing chip');
  }
}
