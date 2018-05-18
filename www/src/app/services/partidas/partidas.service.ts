import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Partida } from './partida.model';
import 'rxjs/add/operator/toPromise';
import { Player } from 'app/routes/player/player';

@Injectable()
export class PartidasService {
	private partidasRestUrl = 'http://localhost:8080/api/v1/gameSet';  // path del controller
	private partidasResourceUrl = 'http://localhost:8080/gameSet';  // path del controller

	localStorage: Storage;

	constructor(private http: HttpClient) {
		this.localStorage = window.localStorage;
	}

  save(partida: Partida): Promise<Response> { //service para crear una partida

		console.log('guardando partida ' + JSON.stringify(partida));
		console.log(`${this.partidasRestUrl}`)
		return this.http.post(`${this.partidasRestUrl}`,
			JSON.stringify(partida),
			{ headers: this.getHeaders() }).toPromise()
			.then(response =>response)
			.catch(this.handleError);
  }

  get(id:any): Promise<Partida> { //service para traer una partida
    return this.http.get(`${this.partidasRestUrl}/getById/`+ id)
              .toPromise()
              .then(response => response as Partida)
              .catch(this.handleError);
  }

  getPartidas(): Promise<Partida[]> { //service para traer todas las partidas
    return this.http.get(`${this.partidasRestUrl}/getAll`, { headers: this.getHeaders() })
              .toPromise()
              .then(response => response as Partida[])
              .catch(this.handleError);
  }

  update(partida: Partida): Promise<Response> { //metodo para editar una partida
		console.log('editando partida ' + JSON.stringify(partida));
		return this.http.put(`${this.partidasRestUrl}/edit`, JSON.stringify(partida), { headers: this.getHeaders() }).toPromise()
			.then(response => response)
			.catch(this.handleError);;
	}

	getGuest(id:any): Promise<Player[]> { 			//service para traer todos los players de una partida
    return this.http.get<any>(`${this.partidasResourceUrl}/${id}/guests` , { headers: this.getHeaders() })
        .toPromise()
        .then(response => response._embedded.players as Player[])
        .catch(this.handleError);
  }

	private getHeaders() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Basic ' + this.localStorage.getItem('AUTH_TOKEN')
		})
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}
