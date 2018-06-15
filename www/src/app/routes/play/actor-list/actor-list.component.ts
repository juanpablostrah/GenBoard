import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Actor } from 'app/routes/actor/actor';
import { MatChipsModule } from '@angular/material/chips';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actorList : Actor[];

  @Output()
  onLoadActors: EventEmitter<void>

  msg = '';

  items = [
    'Candlestick',
    'Dagger',
    'Revolver',
    'Rope',
    'Pipe',
    'Wrench'
  ];

  constructor(private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
    this.actorList = []
  }

  // constructor(private dragula: DragulaService) {
  //   this.dragula.setOptions('bag-items', {
  //     revertOnSpill: true
  //   });
  //
  // }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }

  addActor(actor:any){
    this.actorList.push(actor)
  }

  ngOnInit() {
    console.log("actores :" + this.actorList)

    //console.log("items",this.items)

    // this.dragula
    //   .drag
    //   .subscribe(value => {
    //     this.msg = `Dragging the ${ value[1].innerText }!`;
    //   });
    // this.dragula
    //   .drop
    //   .subscribe(value => {
    //     this.msg = `Dropped the ${ value[1].innerText }!`;
    //
    //     setTimeout(() => {
    //       this.msg = '';
    //     }, 1000);
    //   });
  }

  populateActorList(data : any){
    console.log("DATA",data)
    this.actorList = data;
  }

}
