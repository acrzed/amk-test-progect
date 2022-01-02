import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Depart } from '../../shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from '../../shared/classes/material.service';
import { UserService } from '../../shared/services/user.service';
import { DepartsService } from '../../shared/services/departs.service';

@Component({
  selector: 'app-depart-form',
  templateUrl: './depart-form.component.html',
  styleUrls: ['./depart-form.component.css']
})
export class DepartFormComponent implements OnInit {

  @ViewChild('input') inputRef!: ElementRef
  form: FormGroup = new FormGroup({});
  image?: File
  imagePreview: string | ArrayBuffer | null = ''
  isNew = true
  depart!: Depart

  constructor(private route: ActivatedRoute,
              private usersService: UserService,
              private departsService: DepartsService,
              private router: Router) {
  }
  get ds (){
    return this.form.controls['desc']
  }

  get nm(){
    return this.form.controls['name']
  }


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.minLength(3), Validators.required] ),
      desc: new FormControl(null, [Validators.minLength(3)] )
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.departsService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
    .subscribe(
      (depart: Depart | null) => {
        if (depart) {
          this.depart = depart
          this.form.patchValue({
            name: depart.name,
            desc: depart.desc
          })
          console.warn(depart.img)
          this.imagePreview = depart.img
          MaterialService.updateTextInputs()
        }
        this.form.enable()
      },
      error => MaterialService.toast(error.error.message),
      () => console.info('complete')
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.depart.name}"`)

    if (decision) {
      this.departsService.delete(this.depart._id)
    }
  }

  onFileUpload(event: any ) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.enable()

    if (this.isNew) {
      obs$ = this.departsService.create(this.form.value.name, this.form.value.desc, this.image)
    } else {
      obs$ = this.departsService.update(this.depart._id, this.form.value.name, this.form.value.desc, this.image)
    }

    obs$.subscribe(
      depart => {
        this.depart = depart
        MaterialService.toast(`Изменения сохранены.`)
        this.form.enable()
      },
        (error: { error: { message: string; }; }) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
