import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService {
  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  webSocketUrl = "http://localhost:8080/api/v1/socket/gameset";
  sock : any;
  //this.sock = new SockJS(websocketurl);

  public connect(webSocketUrl): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(webSocketUrl);
      console.log("Successfully connected: " + webSocketUrl);
    }
    return this.subject;
  }

  private create(webSocketUrl): Rx.Subject<MessageEvent> {
    this.sock = new SockJS(webSocketUrl);
    // let ws = new WebSocket(webSocketUrl);

    let observable = Rx.Observable.create(
	(obs: Rx.Observer<MessageEvent>) => {
		this.sock.onmessage = obs.next.bind(obs);
		this.sock.onerror = obs.error.bind(obs);
		this.sock.onclose = obs.complete.bind(obs);
		return this.sock.close.bind(this.sock);
	})
let observer = {
		next: (data: Object) => {
			if (this.sock.readyState === WebSocket.OPEN) {
				this.sock.send(JSON.stringify(data));
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}
