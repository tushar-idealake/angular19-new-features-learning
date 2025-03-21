import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { StarWarsMoviesService } from '../services/starwars-movies.service';
import { StarWarsMovie } from '../types/starwars-movie.type';

@Component({
  selector: 'app-starwars-movies',
  imports: [],
  template: `
    <div>
      <h3 class="movies">Movies</h3>
      @if (moviesResource.isLoading()) {
          <p>Loading movies...</p>
      } @else if (moviesResource.error()) {
          <p>Error: {{ moviesResource.error() }}</p>
      } @else {
        @if (moviesResource.hasValue()) {
          @for (c of moviesResource.value(); track c.title) {
            <p>Title: {{ c.title }}</p>
            <p>Episode: {{ c.episodeId }}</p>
            <p>Release Date: {{ c.releaseDate }}</p>
            <p>Opening Crawl: {{ c.openingCrawl }}</p>
            <hr />
          }
        }
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
export default class StarwarsMoviesComponent {
  films = inject(ROUTER_OUTLET_DATA) as Signal<string[]>;
  movieService = inject(StarWarsMoviesService);

  moviesResource = rxResource({
    request: () => this.films(),
    loader: ({ request }) => 
      this.movieService.retrieveMovies(request),
    defaultValue: [] as StarWarsMovie[]
  }); 
}
