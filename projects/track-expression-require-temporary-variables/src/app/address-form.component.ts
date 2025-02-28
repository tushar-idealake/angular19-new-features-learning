import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Address } from './address.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  imports: [FormsModule],
  template: `
    <div class="container">
      <h2><ng-content select="[header]">Add Address</ng-content></h2>
      <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
        @let newAddress = item();
        <div>
          <label for="line1">
            <span>Line 1:</span>
          </label>
          <input id="line1" name="line1" [(ngModel)]="newAddress.line1" required />
        </div>
        <div>
          <label for="zip">
            <span>Zip:</span>
          </label>
          <input id="zip" name="zip" [(ngModel)]="newAddress.zip" />
        </div>
        <div>
          <label for="postalCode">
            <span>Postal Code:</span>
          </label>
          <input id="postalCode" name="postalCode" [(ngModel)]="newAddress.postalCode" />
        </div>
        <div>
          <label for="city">
            <span>City:</span>
          </label>
          <input id="city" name="city" [(ngModel)]="newAddress.city" required />
        </div>
        <div>
          <label for="country">
            <span>Country:</span>
          </label>
          <input id="country" name="country" [(ngModel)]="newAddress.country" required />
        </div>
        <button type="submit" [disabled]="f.invalid"><ng-content select="[submit-button]">Add</ng-content></button>
        <ng-content select="[actions]" />
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressForm {
  item = input.required<Address>();

  addAddress = output<Address>();

  onSubmit(values: Address) {
    console.log('onSubmit fired');
    this.addAddress.emit(values);
  }
}
