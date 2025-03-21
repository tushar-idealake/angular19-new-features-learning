import { StarWarsCharactersService } from '../services/starwars-characters.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatMap, map, of, scan, Subject, take, timer } from 'rxjs';

@Component({
  selector: 'app-star-wars-cast',
  template: `
    <h4>Cast</h4>
    @if (castResource.hasValue()) {
        <ol>
        @for(name of castResource.value(); track name) {
            <li>{{ name }}</li>
        }
        </ol>
    }
    <hr />
  `,
  styles: `
    li {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarsCastComponent {
  characterUrl = input<string[]>([]);
  characterSub = new Subject<string>();
  cast$ = this.characterSub.pipe(
    scan((acc, value) => ([...acc, value]), [] as string[])
  );

  castResource = rxResource({ 
    loader: () => this.cast$
  });

  charactersService = inject(StarWarsCharactersService);

  constructor() {
    timer(0, 500)
      .pipe(
        map((i) => this.characterUrl()[i]),
        concatMap((url) => {
          console.log(`Retrieve character url: ${url}`);
          return this.charactersService.retrieveCharacterNameByUrl(url)
        }),
        takeUntilDestroyed()
      )
    .subscribe((result) => {
      if (result) {
        this.characterSub.next(result)
      }
    });
  }
}
