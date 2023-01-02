import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Directive({
  selector: 'mat-checkbox[appCheckboxValue]'
})
export class CheckboxValueDirectiveDirective {

  @Input() trueValue:any = true;
  @Input() falseValue:any = false;

  constructor(@Optional() @Self() private ngControl: NgControl, private checkbox: MatCheckbox) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.checkbox.writeValue(value === this.trueValue);
  }

  registerOnChange(fn: any): void {
    this.checkbox.registerOnChange((checked: boolean) => {
      fn(checked ? this.trueValue : this.falseValue);
    });
  }

  registerOnTouched(fn: any): void {
    this.checkbox.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.checkbox.setDisabledState(isDisabled);
  }
}

