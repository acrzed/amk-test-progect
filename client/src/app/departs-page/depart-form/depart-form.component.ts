import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Depart, User } from '../../shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialInstance, MaterialService } from '../../shared/classes/material.service';
import { UserService } from '../../shared/services/user.service';
import { DepartsService } from '../../shared/services/departs.service';

@Component({
  selector: 'app-depart-form',
  templateUrl: './depart-form.component.html',
  styleUrls: ['./depart-form.component.css'],
})
export class DepartFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input') inputRef!: ElementRef;
  @ViewChild('modal') modalRef: ElementRef;

  form: FormGroup = new FormGroup({});
  image?: File;
  imagePreview: string | ArrayBuffer | null = '';
  isNew = true;
  depart!: Depart;
  modal: MaterialInstance;
  delDescription: string = ''

  constructor(private route: ActivatedRoute,
              private usersService: UserService,
              private departsService: DepartsService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.minLength(3), Validators.required]),
      desc: new FormControl(null, [Validators.minLength(3)]),
      delDesc: new FormControl(null, [Validators.minLength(3)]),
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.departsService.getById(params['id']);
            }
            return of(null);
          },
        ),
      )
      .subscribe(
        (depart: Depart | null) => {
          if (depart) {
            this.depart = depart;
            this.form.patchValue({
              name: depart.name,
              desc: depart.desc,
            });
            console.warn(depart.img);
            this.imagePreview = depart.img;
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        error => MaterialService.toast(error.error.message),
        () => console.info('complete'),
      );
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  confirmDel(){
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  deleteCategory() {
    // const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.depart.name}"`);
    this.form.disable()

    const completed = () => {
      this.modal.close()
      // this.form.reset({name: '', cost: 1})
      this.form.enable()
    }
    this.departsService.delete(this.depart._id, this.form.value.delDesc)
      .subscribe(
      delDepart => MaterialService.toast('Изменения сохранены'),
      error => MaterialService.toast(error.error.message),
      completed
      )
    // completed()
    // if (decision) {
    // }
  }

  onSubmit() {
    let obs$;
    this.form.enable();

    if (this.isNew) {
      obs$ = this.departsService.create(this.form.value.name, this.form.value.desc, this.image);
    } else {
      obs$ = this.departsService.update(this.depart._id, this.form.value.name, this.form.value.desc, this.image);
    }

    obs$.subscribe(
      depart => {
        this.depart = depart;
        if (this.isNew) {
          MaterialService.toast(`Отдел ${this.depart.name} создан.`);
        } else {
          MaterialService.toast(`Изменения сохранены.`);
        }
        this.form.enable();
      },
      (error: { error: { message: string; }; }) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      },
    );
  }

  onCancel() {
    this.modal.close();
  }

  get ds() {
    return this.form.controls['desc'];
  }

  get nm() {
    return this.form.controls['name'];
  }

  // onSelectUser(user: User) {
  //   this.userId = user._id
  //   this.form.patchValue({
  //     name: user.name
  //   })
  //   this.modal.open()
  //   MaterialService.updateTextInputs()
  // }
  //
  // onAddUser() {
  //   this.userId = null
  //   this.form.reset({name: null})
  //   this.modal.open()
  //   MaterialService.updateTextInputs()
  // }
  //
  // onDeleteUser(event: Event, user: User) {
  //   event.stopPropagation()
  //   const decision = window.confirm(`Удалить позицию "${user.name}"?`)
  //   //
  //   // if (decision) {
  //   //   this.positionsService.delete(user).subscribe(
  //   //     response => {
  //   //       const idx = this.positions.findIndex(p => p._id === user._id)
  //   //       this.positions.splice(idx, 1)
  //   //       MaterialService.toast(response.message)
  //   //     },
  //   //     error => MaterialService.toast(error.error.message)
  //   //   )
  //   // }
  // }
  //


}
