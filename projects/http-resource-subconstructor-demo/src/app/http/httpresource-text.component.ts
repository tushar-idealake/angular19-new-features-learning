import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { makeResourceRefStatus } from './http-resource-ref.util';

const TEXT_URL = 'https://gist.githubusercontent.com/railsstudent/929466a301d70d65db78fc42961c8e6c/raw/956c44e5525f8fe7840f10d626820368d29fd6c3/response.txt';

@Component({
  selector: 'app-resource-text',
  templateUrl: './httpresource-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourceTextComponent {
  textUrl = TEXT_URL;
  textSignal = signal('');

  textResource = httpResource.text(
    () => this.textSignal() ? this.textSignal() : undefined, {
    defaultValue: ''
  });

  resourceRefStatus = makeResourceRefStatus<string>(this.textResource);
  textError = this.resourceRefStatus.error;
  value = this.resourceRefStatus.value;
}
