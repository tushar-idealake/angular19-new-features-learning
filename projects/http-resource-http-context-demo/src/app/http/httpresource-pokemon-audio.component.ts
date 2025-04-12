import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { HttpContext, httpResource } from '@angular/common/http';
import { RESPONSE_TYPE } from './http-context-token.constant';
import { makeResourceRefStatus } from './utils/binary-resource-ref.util';
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
  responseType = input<'arraybuffer' | 'blob'>('arraybuffer');

  audioResourceRef = httpResource(
    () => this.audioSignal() ? { 
      url: this.audioSignal(),
      reportProgress: true,
      context: new HttpContext().set(RESPONSE_TYPE, this.responseType())
    } : undefined
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
