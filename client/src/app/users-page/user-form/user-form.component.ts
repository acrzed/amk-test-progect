import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Position, User } from '../../shared/interfaces';
import { MaterialInstance, MaterialService } from '../../shared/classes/material.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionsService } from '../../shared/services/positions.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId!: string
  @Input('departId') departId!: string
  @ViewChild('modal') modalRef!: ElementRef

  positions: Position[] = []
  users: User[] = []
  loading = false
  positionId: any
  userID: any
  modal!: MaterialInstance
  form!: FormGroup

  constructor(private positionsService: PositionsService,
              private userService: UserService
) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.userService
      .getByDepart(this.departId)
      .subscribe(users => {
        this.users = users
        this.loading = false
      })
    this.positionsService
      .fetch(this.categoryId)
      .subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngOnDestroy() {
    // this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(user: User) {
    this.userID = user._id
    this.form.patchValue({
      name: user.name,
      cost: user.phones
    })
    // this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.userID = null
    // this.form.reset({name: null, cost: 1})
    // this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeletePosition(event: Event, user: User) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${user.name}"?`)

    // if (decision) {
    //   this.userService.delete(user).subscribe(
    //     response => {
    //       const idx = this.positions.findIndex(p => p._id === user._id)
    //       this.positions.splice(idx, 1)
    //       MaterialService.toast(response.message)
    //     },
    //     error => MaterialService.toast(error.error.message)
    //   )
    // }
  }

  onCancel() {
    // this.modal.close()
  }

  onSubmit() {
    // this.form.disable()

    const newPosition: Position = {
      name: this.form?.value.name,
      cost: this.form?.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      // this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Изменения сохранены')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        position => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }


  }

}
