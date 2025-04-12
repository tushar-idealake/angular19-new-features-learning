import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { HttpResourceArrayBufferComponent } from './http/httpresource-arraybuffer.component';
import { HttpResourceBlobComponent } from './http/httpresource-blob.component';
import { elapsed } from './interceptors/logging.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HttpResourceBlobComponent, 
    HttpResourceArrayBufferComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/59876',
  ];
  name = 'httpResource and HttpInterceptor Demo';
  description = 'Intercept the httpResource Request';

  elapsed = elapsed;
}