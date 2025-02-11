import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Film, LucideAngularModule, Ticket } from 'lucide-angular';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly Film = Film;
  readonly Ticket = Ticket;
}
