import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  // styleUrls: ['./login-page.component.css'],
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
    `]
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  aSub: Subscription = new Subscription()

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете зайти в систему используя свои данные')
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заного')
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  get phoneControl() {
    return this.form.get('phone') as AbstractControl;
  }
  get phoneError() {
    return this.form.get('phone')?.errors as AbstractControl;
  }



  onSubmit() {

    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/test']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
