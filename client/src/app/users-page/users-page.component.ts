import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  users$!: Observable<User[]>;
  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.fetch();
  }
}
