import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Player } from 'app/routes/player/player';
import { AppConfig } from 'app/config/app.config';

@Injectable()
export class PlayerService {
	private apiUrl = AppConfig.endpoints.api;
	private apiResourceUrl = AppConfig.endpoints.apiResource;
	private playerRestUrl = this.apiUrl + '/player';  // path del controller
	private playerResourceUrl = this.apiResourceUrl + '/player';  // path del controller

	localStorage: Storage;

	constructor(private http: HttpClient) {
		this.localStorage = window.localStorage;
	}

  save(player: Player): Promise<Response> { //service para crear un player

		console.log('guardando player ' + JSON.stringify(player));
		console.log(`${this.playerRestUrl}`)
		return this.http.post(`${this.playerRestUrl}`,
			JSON.stringify(player),
			{ headers: this.getHeaders() }).toPromise()
			.then(response =>response)
			.catch(this.handleError);
  }

  get(id:any): Promise<Player> { //service para traer un player
    return this.http.get(`${this.playerRestUrl}/getById/`+ id)
              .toPromise()
              .then(response => response as Player)
              .catch(this.handleError);
  }

  getByUserName(username : String): Promise<Player> { //service para traer un player a traves del username
    return this.http.get(`${this.playerRestUrl}/getByUsername/` + username)
              .toPromise()
              .then(response => response as Player)
              .catch(this.handleError);
  }

  getPlayers(): Promise<Player[]> { //service para traer todos los players
    return this.http.get(`${this.playerResourceUrl}/getAll`, { headers: this.getHeaders() })
              .toPromise()
              .then(response => response as Player[])
              .catch(this.handleError);
  }

  update(player: Player): Promise<Response> { //metodo para editar un player
		console.log('editando player ' + JSON.stringify(player));
		return this.http.put(`${this.playerRestUrl}/edit`, JSON.stringify(player), { headers: this.getHeaders() }).toPromise()
			.then(response => response)
			.catch(this.handleError);;
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
