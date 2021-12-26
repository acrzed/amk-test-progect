import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  // template: `
  //   <form [formGroup]="form" class="card" (ngSubmit)="onSubmit()"
  //   >
  //     <div class="card-content">
  //       <span class="card-title">Войти в систему</span>

  //       <div class="input-field">
  //         <input id="email" type="email" required>
  //         <label for="email">Email:</label>
  //       </div>

  //       <div class="input-field">
  //         <input id="password" type="password" required>
  //         <label for="password">Пароль:</label>
  //       </div>

  //     </div>

  //     <div class="card-action">
  //       <button
  //         type="submit"
  //         class="modal-action btn waves-effect"
  //       >Войти</button>
  //     </div>

  //   </form>
  // `,
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {



  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
