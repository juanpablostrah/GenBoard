import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../config/app.config';
import { TranslateService } from '@ngx-translate/core';
import * as SockJS from 'sockjs-client';

@Injectable()
export class PartidasSocketService {

  private translations: any;

  constructor(
    private translateService: TranslateService
  ) {
    console.log('partidas socket constructor')
  }

  connect(partidaId: number, actorId: number){
    return Observable.create((observer)=>{
      const sock = new SockJS(AppConfig.endpoints.socketGameSet);

      sock.onopen = ()=>{
        //console.log('connetion succesfull')
        console.log('open');
        var data = {
          partidaId: partidaId,
          actorId: actorId
        };
        sock.send(JSON.stringify({
          tag: 'AUTHORIZE',
          data: data
        }));
      }

      sock.onmessage = (message: any)=> {
        const incommingMessage = JSON.parse(message.data)
        if(incommingMessage.tag == 'CONNECTION_SUCCESS'){
          console.log('CONNECTION_SUCCESS')
          const callbacks = [];
          sock.onmessage = (message: any)=> {
            const incommingMessage = JSON.parse(message.data);
            //En este punto se podría manejar una desconexion;
            for(const callback of callbacks){
              callback(incommingMessage.tag, incommingMessage.data);
            }
          }
          const client = {
            sendMessage: (tag, data)=> {
              sock.send(JSON.stringify({
                tag: tag,
                data: data
              }))
            },
            onMessage:(callback) => {
              callbacks.push(callback);
            }
          }
          observer.next(client);
        }
        else{
          console.log('something went wrong, receive message before connect')
        }
      }

    })
  }

}
