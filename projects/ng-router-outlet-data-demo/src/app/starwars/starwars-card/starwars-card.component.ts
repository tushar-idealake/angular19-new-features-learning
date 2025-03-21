import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { StarWarsCharacterNature } from '../types/starwars-character.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-star-wars-card',
  imports: [RouterLink],
  template: `
    <div class="card">
      @let character = c();
      <span>Id: {{ character.id }}</span>&nbsp;&nbsp;&nbsp;
      <a [routerLink]="[character.id]" (click)="showFighter.emit(character)" 
      >{{ c().name }}</a>
    </div>
  `,
  styles: `
    .card { 
      border: 1px solid black; 
      border-radius: 0.25rem; 
      margin-bottom: 0.25rem; 
      padding: 0.35rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarsCardComponent {
  c = input.required<StarWarsCharacterNature>();
  selectedFighter = signal<StarWarsCharacterNature | undefined>(undefined);
  showFighter = output<StarWarsCharacterNature>();
}
