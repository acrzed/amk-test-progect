import { Component } from '@angular/core';



@Component({
  selector: 'app-name-editor',
  templateUrl:'./name-editor.component.html',
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `]
  // styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {

  userPhone = ''
  userEmail = ''
  userName = ''


  addUser(){
    console.log(this.userPhone, this.userName,this.userEmail);
  }

}
