import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { makeResourceRefStatus } from './http-resource-ref.util';

const PIKACHU_OGG_URL = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg';

@Component({
  selector: 'app-resource-blob',
  templateUrl: './httpresource-blob.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourceBlobComponent {
  audioUrl = PIKACHU_OGG_URL;
  audioSignal = signal('');

  audioResource = httpResource.blob(
    () => this.audioSignal() ? { 
      url: this.audioSignal(),
      reportProgress: true,
    } : undefined
  );

  resourceRefStatus = makeResourceRefStatus<Blob>(this.audioResource);
  audioProgress = this.resourceRefStatus.progress;
  audioError = this.resourceRefStatus.error;
  value = this.resourceRefStatus.value;

  blobURL = computed(() => 
    this.value() ?
      URL.createObjectURL(this.value() as Blob) :
      undefined
    );
}
