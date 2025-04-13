import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { BinaryResponseType } from './type/response-type.type';
import { makeResourceRefStatus } from './utils/binary-resource-ref.util';
import { makeHttpRequest } from './utils/http-request.util';
import { createURLFromBinary } from './utils/object-url.util';

const PIKACHU_OGG_URL = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg';

@Component({
  selector: 'app-resource-pokemon-audio',
  templateUrl: './httpresource-pokemon-audio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourcePokemonAudioComponent {
  audioUrl = PIKACHU_OGG_URL;
  audioSignal = signal('');
  responseType = input<BinaryResponseType>('');

  audioResourceRef = httpResource(
    () => this.audioSignal() ? makeHttpRequest(this.audioSignal(), this.responseType()) : undefined
  );

  resourceRefStatus = makeResourceRefStatus(this.audioResourceRef);
  audioError = this.resourceRefStatus.error;
  audioProgress = this.resourceRefStatus.progress;

  audioSrc = computed(() => {
    const value = this.audioResourceRef.hasValue() ? 
      this.audioResourceRef.value() : undefined;
    return createURLFromBinary(this.responseType(), value);
  });
}
