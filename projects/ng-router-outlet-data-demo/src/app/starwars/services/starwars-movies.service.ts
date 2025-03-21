import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, of } from 'rxjs';
import { RawStarWarsMovie, StarWarsMovie } from '../types/starwars-movie.type';

function toStarWarsMovieMapper(fromData: RawStarWarsMovie) {
  return {
    title: fromData.title,
    openingCrawl: fromData.opening_crawl,
    releaseDate: fromData.release_date,
    episodeId: fromData.episode_id,
  } as StarWarsMovie
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsMoviesService {
  #httpClient = inject(HttpClient);

  retrieveMovie(url: string) {
    return this.#httpClient.get<RawStarWarsMovie>(url)
      .pipe(
        map((fromCharacter) => toStarWarsMovieMapper(fromCharacter)),
        catchError((e) => {
          console.error(e);
          return of(undefined)
        })
      )
  }

  retrieveMovies(urls: string[]) {
    const starWarsMovieObservables = urls.map((url) => 
      this.retrieveMovie(url)
    ) 
      
    return forkJoin(starWarsMovieObservables)
      .pipe(
        map((characters) => {
            return characters.filter((c) => typeof c !== 'undefined')
        })  
      );
  }
}
