import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  aSub: Subscription = new Subscription()

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  get phoneControl() {
    return this.form.get('phone') as AbstractControl;
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }


}
