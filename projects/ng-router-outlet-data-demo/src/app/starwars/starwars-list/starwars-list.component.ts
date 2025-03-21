import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA, RouterOutlet } from '@angular/router';
import { StarWarsCardComponent } from '../starwars-card/starwars-card.component';
import { StarWarsCharactersService } from '../services/starwars-characters.service';
import { StarWarsCharacterNature } from '../types/starwars-character.type';
import { FighterList } from '../types/starwars-list.type';

@Component({
  selector: 'app-starwars-list',
  imports: [StarWarsCardComponent, RouterOutlet],
  template: `
    <div>
      <h3 class="fighters">Fighters</h3>
      @if (charactersResource.isLoading()) {
          <p>Loading characters...</p>
      } @else if (charactersResource.error()) {
          <p>Error: {{ charactersResource.error() }}</p>
      } @else {
        @if (charactersResource.hasValue()) {
          @for (c of charactersResource.value(); track c.id) {
            <app-star-wars-card [c]="c" 
              (showFighter)="selectedFighter.set($event)" />
          }
          <router-outlet [routerOutletData]="selectedFighter()" />
        }
      }
    </div>
  `,
  styles: `
    .fighters {
      font-style: italic; 
      text-decoration: underline; 
      margin-bottom: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsListComponent {
  fighterList = inject(ROUTER_OUTLET_DATA) as Signal<FighterList>;
  starWarsCharactersService = inject(StarWarsCharactersService);
  selectedFighter = signal<StarWarsCharacterNature | undefined>(undefined);
  
  charactersResource = rxResource({
    request: () => this.fighterList(),
    loader: ({ request }) => 
      this.starWarsCharactersService.retrieveCharacters(request),
    defaultValue: [] as StarWarsCharacterNature[]
  });
}
