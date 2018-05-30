import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Actor } from 'app/routes/actor/actor';

@Injectable()
export class ActorService {
	private actorRestUrl = 'http://localhost:8080/api/v1/gameSet';  // path del controller
	private actorResourceUrl = 'http://localhost:8080/gameSet';  // path del controller

	localStorage: Storage;

	constructor(private http: HttpClient) {
		this.localStorage = window.localStorage;
	}

  // save(actor: Actor): Promise<Response> { //service para crear un actor
  //
	// 	console.log('creando actor ' + JSON.stringify(actor));
	// 	console.log(`${this.partidasRestUrl}`)
	// 	return this.http.post(`${this.partidasRestUrl}`,
	// 		JSON.stringify(actor),
	// 		{ headers: this.getHeaders() }).toPromise()
	// 		.then(response =>response)
	// 		.catch(this.handleError);
  // }
  //
  // get(id:any): Promise<Partida> { //service para traer una partida
  //   return this.http.get(`${this.partidasRestUrl}/getById/`+ id)
  //             .toPromise()
  //             .then(response => response as Partida)
  //             .catch(this.handleError);
  // }
  //
  // getPartidas(): Promise<Partida[]> { //service para traer todas las partidas
  //   return this.http.get(`${this.partidasRestUrl}/getAll`, { headers: this.getHeaders() })
  //             .toPromise()
  //             .then(response => response as Partida[])
  //             .catch(this.handleError);
  // }
  //
  // update(partida: Partida): Promise<Response> { //metodo para editar una partida
	// 	console.log('editando partida ' + JSON.stringify(partida));
	// 	return this.http.put(`${this.partidasRestUrl}/edit`, JSON.stringify(partida), { headers: this.getHeaders() }).toPromise()
	// 		.then(response => response)
	// 		.catch(this.handleError);;
	// }
  //
	// setGameSetInitiaive(id:any): Promise<Actor[]> { 			//service para setear todos los puedeJugar de los actores en true
  //   return this.http.post<any>(`${this.partidasResourceUrl}/${id}/actors/set` , { headers: this.getHeaders() })
  //       .toPromise()
  //       .then(response => response._embedded.actors as Actor[])
  //       .catch(this.handleError);
  // }
  //
	// private getHeaders() {
	// 	return new HttpHeaders({
	// 		'Content-Type': 'application/json',
	// 		'Authorization': 'Basic ' + this.localStorage.getItem('AUTH_TOKEN')
	// 	})
	// }
  //
	// private handleError(error: any): Promise<any> {
	// 	console.error('An error occurred', error);
	// 	return Promise.reject(error.message || error);
	// }

}
