import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.css']
})
export class GameLogComponent implements OnInit {

  @Input()
  dataSet: [{}]

  @Output()
  onChat: EventEmitter<any>

  chat: String

  log: String[]

  constructor() {
    this.onChat = new EventEmitter<String>();
  }

  ngOnInit() {
    this.log = []
  }

  sendChat(chat : String){
    console.log(this.chat)
    this.onChat.emit({chat:this.chat})
  }

  doChat(chat : String){
    this.log.push(chat)
  }

  doLog(dataSet: [any]){
    var sum = 0
    var log = ""
    dataSet.map((dicetype)=> {
      if (dicetype.value !== 0) {
        sum += dicetype.results.reduce((sum, x) => sum + x , 0) + dicetype.modifier
        log += dicetype.value+'d'+dicetype.descriptor+'('+dicetype.results.toString()+')'
        if (dicetype.modifier > 0) {
          log += '+' + dicetype.modifier
        } else if (dicetype.modifier < 0) {
          log += dicetype.modifier
        }
        log += '+'
      }
    })
    log = log.slice(0, -1);
    log += '= '+sum
    console.log(log)
    this.log.push(log)
  }

}
