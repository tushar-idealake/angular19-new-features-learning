import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { HttpResourcePokemonAudioComponent } from './http/httpresource-pokemon-audio.component';
import { HttpResourcePokemonComponent } from './http/httpresource-pokemon.component';
import { elapsed } from './interceptors/logging.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HttpResourcePokemonComponent, HttpResourcePokemonAudioComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/60188',
  ];
  name = 'httpResource and HttpContext Demo';
  description = 'Setting HttpContext Token in a httpResource and reading the token in an interceptor';

  elapsed = elapsed;
}
