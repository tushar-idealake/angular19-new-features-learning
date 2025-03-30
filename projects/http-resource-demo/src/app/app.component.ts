import { ChangeDetectionStrategy, Component, computed, signal, VERSION } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FighterList } from './starwars/starwars-list/types/starwars-list.type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/59876',
    'https://github.com/angular/angular/pull/60026'
  ];
  name = 'httpResource equality function';
  description = 'httpResource to query data';

  allegiance = signal('jedi');
  fighterIds = computed<FighterList>(() => {
    if (this.allegiance() == 'jedi') {
      return { ids: [1, 10, 17, 20, 51, 52, 53, 32], isSith: false };
    }
    return { ids: [4, 17, 44, 21, 67], isSith: true };
  });
}