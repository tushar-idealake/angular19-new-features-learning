import { ChangeDetectionStrategy, Component, computed, signal, VERSION } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FighterList } from './starwars/types/starwars-list.type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  template: `
    <div>
      <h1>{{ version }} - {{ name }}</h1>
      <h2>{{ description }}</h2>
      <h3>PR:</h3>
      <ul>
        <li><a [href]="pr" target="_blank">{{ pr }}</a></li>
      </ul>
      <div>
        Select your alligance:<br/>
        <input type="radio" id="jedi" name="Jedi" value="jedi" [(ngModel)]="alligance">
        <label for="jedi">&nbsp;&nbsp;Jedi</label><br/>
        <input type="radio" id="sith" name="Sith" value="sith" [(ngModel)]="alligance">
        <label for="sith">&nbsp;&nbsp;Sith</label><br/>
      </div>
      Selected alligence: {{ alligance() }}
      <router-outlet [routerOutletData]="fighterIds()" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  pr = 'https://github.com/angular/angular/pull/57051';
  name = 'Router Outlet Data';
  description = 'Router Outlet can pass data to routed component';

  alligance = signal('jedi');
  fighterIds = computed<FighterList>(() => {
    if (this.alligance() == 'jedi') {
      return { ids: [1, 10, 20, 51, 52, 53, 32], isSith: false };
    }
    return { ids: [4,44, 21, 67], isSith: true };
  });
}
