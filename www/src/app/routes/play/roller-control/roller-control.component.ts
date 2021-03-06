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

  @Output()
  onThrowInitiative: EventEmitter<void>

  @Output()
  onCombatMode: EventEmitter<any>

  @Output()
  onFinishTurn: EventEmitter<any>

  @ViewChild(NgForm)
  form:NgForm

  yourTurn : boolean;

  showThrow : boolean;

  isIniciative : boolean;

  isFinishTurn : boolean;

  combatMode   : boolean;

  constructor() {
    this.onRoll = new EventEmitter();
    this.onThrowInitiative = new EventEmitter();
    this.onCombatMode = new EventEmitter();
    this.onFinishTurn = new EventEmitter();
    this.yourTurn = false;
    this.showThrow = true;
    this.isFinishTurn = false;
    this.combatMode = false;
  }

  ngOnInit(){

  }

  onSubmit():void{
    if(!this.form.valid){
      return
    }
    this.onRoll.emit();
  }

  throwInitiative(){
    this.onThrowInitiative.emit()
    this.disabledTurn()
  }

  public resetDice(){
    if (this.form.valid) {
      //this.dataSet.map((dataSet) => dataSet.reset())
      this.form.reset();
    }
  }

  finishTurn(){
    this.isFinishTurn = true;
    this.onFinishTurn.emit()
    this.disabledTurn()
  }

  enabledTurn(){
    this.yourTurn = true;
  }

  disabledTurn(){
    this.yourTurn = false;
  }

  changeShow(){
    this.changeShowThrow(!this.showThrow)
    console.log("HABILITO SHOW", this.showThrow)
  }

  changeShowThrow(show:boolean){
    this.showThrow = show
  }

  changeCombatMode(show:boolean){
    console.log("COMBAT MODE", show)
    this.combatMode = show
  }

}
