import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnInit,
  QueryList
} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
import {StepComponent} from './step/step.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements AfterContentChecked {

  currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>

  constructor() {
    interval(10000).subscribe(() => {
      this.next()
    })
  }

  ngAfterContentChecked(): void {
    this.steps.forEach((step, index) => {
      step.index = index
      // Utile uniquement en DEV
      step.changeRef.detectChanges()
    })

  }

  prev() {
    this.currentIndex.next( this.currentIndex.value ? this.currentIndex.value - 1 : this.steps.length - 1)
  }

  next() {
    this.currentIndex.next(this.currentIndex.value + 1 === this.steps.length ? 0 : this.currentIndex.value + 1)
  }

}
