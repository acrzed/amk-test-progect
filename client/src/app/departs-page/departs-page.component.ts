import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Depart } from '../shared/interfaces';
import { DepartsService } from '../shared/services/departs.service';

@Component({
  selector: 'app-depart-page',
  templateUrl: './departs-page.component.html',
  styleUrls: ['./departs-page.component.css']
})
export class DepartsPageComponent implements OnInit {
  departs$!: Observable<Depart[]>;
  id!: string
  constructor(
    private departService: DepartsService,
  ) {}

  ngOnInit(): void {
    this.departs$ = this.departService.fetch();
  }
}
