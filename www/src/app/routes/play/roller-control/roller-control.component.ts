import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-roller-control',
  templateUrl: './roller-control.component.html',
  styleUrls: ['./roller-control.component.css']
})
export class RollerControlComponent implements OnInit {

  @Input()
  dataSet: [{}]

  @Output()
  onRoll: EventEmitter<void>

  @ViewChild(NgForm)
  form:NgForm

  constructor() {
    this.onRoll = new EventEmitter();
  }

  ngOnInit(){}

  onSubmit():void{
    if(!this.form.valid){
      return
    }
    this.onRoll.emit();
  }

  public resetDice(){
    if (this.form.valid) {
      console.log("Form Submitted!");
      this.form.reset();
    }
  }


}
