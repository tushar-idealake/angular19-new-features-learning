import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, linkedSignal, signal, VERSION } from '@angular/core';
import { Joke, JokeAudit, jokeSchema } from './schemas/joke.schema';

@Component({
  selector: 'app-root',
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

  numClicked = signal(0);
  category = signal('');

  jokeResource = httpResource(() => 
  this.category() ? 
  `https://v2.jokeapi.dev/joke/${this.category()}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&idRange=1-5`: undefined, {
    parse: (raw) => jokeSchema.parse(raw),
    equal: (a, b) => {
      if (!a) {
        return !b;
      }

      return a.id == b.id;
    },
  });

  jokeAudit = linkedSignal<{ joke: Joke | undefined }, JokeAudit | undefined>({
    source: () => ({ joke: this.jokeResource.value() }),
    computation: (source, previous) => {
      if (!source.joke) {
        return undefined;
      }
      const numUpdates = previous?.value?.numUpdates || 0;
      return { 
        ...source.joke,
        numUpdates: numUpdates + 1,
      };
    }
  });

  generateJoke() {
    this.category.set('Programming');
    this.numClicked.update((prev) => prev + 1);
    this.jokeResource.reload();
  }
}