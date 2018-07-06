import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Actor } from 'app/routes/actor/actor';
import { ActorService } from 'app/services/actor/actor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-log',
  templateUrl: './game-log.component.html',
  styleUrls: ['./game-log.component.css']
})
export class GameLogComponent implements OnInit {

  private subscription: any;

  @Input()
  actorListNew : Actor[];

  @Input()
  dataSet: [{}]

  @Output()
  onChat: EventEmitter<any>

  @Output()
  onDoChat: EventEmitter<any>

  currentActorName: Actor;

  chat: String

  log: String[]

  constructor(private actorService : ActorService,private route: ActivatedRoute) {
    this.onChat = new EventEmitter<String>();
    this.onDoChat = new EventEmitter<any>();
  }

  ngOnInit() {
    this.log = []
  }

  sendChat(chat: String){
    console.log(this.chat)
    this.onChat.emit({chat:this.chat})
  }

  doChat(chat: String , actorId: any){
    console.log("DO_CHAT",chat,actorId)
    this.subscription = this.route.params
    this.actorService.get(actorId).then(actor =>
      this.log.push(actor.name + " : " + chat))


        // this.currentActorName = this.actorListNew.find(actor => actor.id == actorId);
        // this.log.push(this.currentActorName.name + " : " + chat)
  }

  clearChat(){
    this.chat = "";
  }

  //doLog(dataSet: [any]){
  doLog(data :any){
    console.log("BUILDLOG",data)
    var sum = 0
    var log = ""
    var dataSet = data.dataSet.result.dataSet
    console.log("DATASET",dataSet)
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
    this.currentActorName = this.actorListNew.find(actor => actor.id == data.actorId);
    this.log.push(this.currentActorName.name + " : " + log)
    //this.log.push(log)
  }

}
