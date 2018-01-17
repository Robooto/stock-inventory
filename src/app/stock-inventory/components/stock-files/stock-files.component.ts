import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-files',
  styles: [''],
  template: `
    <div class="stock-product" [formGroup]="parent">
      <div formArrayName="files">
        <div
          *ngFor="let item of files; let i = index;">
          
          <div class="stock-product__content" [formGroupName]="i">
            <div class="stock-product__name">
              {{ item.value.name }}
            </div>
            <div class="stock-product__price">
              {{ item.value.type }}
            </div>
            <button 
              type="button"
              (click)="onRemove(item, i)">
              Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  `
})
export class StockFilesComponent {
  @Input()
  parent: FormGroup;

  @Input()
  fileList: File[];

  _file: File;

  @Output()
  removed = new EventEmitter<any>();

  onRemove(group, index) {
    this.removed.emit({ group, index });
  }

  get files() {
    return (this.parent.get('files') as FormArray).controls;
  }

}