import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  form = new FormGroup({
    first: new FormControl(),
    last: new FormControl()
  });
  getVal(){
    this.form.get('first.value')
  }
  constructor() { }

  ngOnInit(): void {
    this.form.setValue({first: 'Тестовая страница', last: 'все ОК'})
    // console.log(this.form.get('first')?.value)
  }

}
