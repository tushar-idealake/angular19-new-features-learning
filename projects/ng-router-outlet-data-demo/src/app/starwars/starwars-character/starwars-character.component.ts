import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { StarWarsCharacterNature } from '../types/starwars-character.type';
import { ROUTER_OUTLET_DATA, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-starwars-character',
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      @if (fighter(); as f) {
        <div style="border: 1px solid black;">
            <div class="character">
              <p>Name: {{ f.name }}</p>
              <p>Gender: {{ f.gender }}</p>
              <p>Is Sith? {{ f.isSith }}</p>
              <p>Eye Color: {{ f.eyeColor }}</p>
              <p>Hair Color: {{ f.hairColor }}</p>
              <p>Skin Color: {{ f.skinColor }}</p>
            </div>
            <a [routerLink]="['films']" >Show Films</a>
        </div>
        <router-outlet [routerOutletData]="films()" />
      }
    </div>
  `,
  styles: `
    .character {
      display: flex; 
      justify-content: space-between; 
      flex-wrap: wrap;
    }

    .character > * {
      flex: 1 1 calc(100% / 3)
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsCharacterComponent {
  fighter = inject(ROUTER_OUTLET_DATA) as Signal<StarWarsCharacterNature>;
  films = computed(() => this.fighter().films);
}
