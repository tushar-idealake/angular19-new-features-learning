import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { StarWarsMovieComponent } from './starwars-movie.component';

@Component({
  selector: 'app-starwars-movies',
  imports: [StarWarsMovieComponent],
  template: `
    <div>
      <h3 class="movies">Films</h3>
      @for (url of urls(); track url) {
        <app-starwars-movie [url]="url" />
      }
    </div>
  `,
  styles: `
    .movies {
      font-style: italic; 
      text-decoration: underline; 
      margin-bottom: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarWarsMoviesComponent {
  urls = inject(ROUTER_OUTLET_DATA) as Signal<{ value: string }[]>;
}
