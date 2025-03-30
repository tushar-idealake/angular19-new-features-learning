import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA, RouterLink, RouterOutlet } from '@angular/router';
import { StarWarsCharacter } from '../starwars-card/types/starwars-character.type';

@Component({
  selector: 'app-starwars-character',
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      @if (fighter(); as f) {
        <div style="border: 1px solid black;">
            <div class="character">
              <p><label>Name: </label>{{ f.name }}</p>
              <p><label>Gender: </label>{{ f.gender }}</p>
              <p><label>Is Sith? </label>{{ f.isSith }}</p>
              <p><label>Eye Color: </label>{{ f.eyeColor }}</p>
              <p><label>Hair Color: </label>{{ f.hairColor }}</p>
              <p><label>Skin Color: </label>{{ f.skinColor }}</p>
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
  fighter = inject(ROUTER_OUTLET_DATA) as Signal<StarWarsCharacter>;

  films = computed(() => this.fighter().films);
}
