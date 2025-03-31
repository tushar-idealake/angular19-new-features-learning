import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

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
}