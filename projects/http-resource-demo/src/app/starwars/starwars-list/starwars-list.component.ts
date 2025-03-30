import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA, RouterOutlet } from '@angular/router';
import { StarWarsCardComponent } from '../starwars-card/starwars-card.component';
import { FighterList } from './types/starwars-list.type';
import { StarWarsCharacter } from '../starwars-card/types/starwars-character.type';

@Component({
  selector: 'app-starwars-list',
  imports: [StarWarsCardComponent, RouterOutlet],
  template: `
    <div>
      <h3 class="fighters">Fighters</h3>
      @let ids = fighterList().ids;
      @let isSith = fighterList().isSith;
      @for (id of ids; track id) {
        @let input = { id: id, isSith: isSith };
        <app-star-wars-card [characterInput]="input"
          (showFighter)="selectedFighter.set($event)" />
      }
      <router-outlet [routerOutletData]="selectedFighter()" />
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
  selectedFighter = signal<StarWarsCharacter | undefined>(undefined);
}
