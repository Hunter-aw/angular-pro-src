import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-inventory',
  // styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      Hello world!
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch [parent]="form"> </stock-branch>
        <stock-selector [parent]="form" [products]="products" (added)="addStock($event)"> </stock-selector>
        <stock-products [parent]="form" (removed)="removeStock($event)"> </stock-products>

        <div class="stock-inventory__buttons">
          <button type="submit" [disabled]="form.invalid">
            Order stock
          </button>
        </div>
        <pre> {{ form.value | json }} </pre>
      </form>
    </div>
  `
})
export class StockInventoryComponent {
  products: Product[] = [
    { id: 1, price: 2800, name: 'Macbook Pro' },
    { id: 2, price: 98, name: 'USB Pro' },
    { id: 3, price: 345, name: 'Macbook Mini' },
    { id: 4, price: 3727, name: 'Ipod' },
    { id: 5, price: 600, name: 'Watch' }
  ];

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([
      this.createStock({product_id: 1, quantity: 10}),
      this.createStock({product_id: 3, quantity: 50})
    ])
  });

  constructor(
    private fb: FormBuilder
  ) { }

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    })
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit', this.form.value);
  }
}
