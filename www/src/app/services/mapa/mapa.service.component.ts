import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Player } from 'app/routes/player/player';
import { Actor } from 'app/routes/actor/actor';
import { AppConfig } from 'app/config/app.config';

@Injectable()
export class MapaService {
	private apiUrl = AppConfig.endpoints.api;
	private apiResourceUrl = AppConfig.endpoints.apiResource;
	private mapaRestUrl = this.apiUrl + '/mapa';  // path del controller
	private mapaResourceUrl = this.apiResourceUrl + '/mapa';  // path del controller

	localStorage: Storage;

	constructor(private http: HttpClient) {
		this.localStorage = window.localStorage;
	}

  save(mapa: any): Promise<Response> { //service para crear un mapa
		console.log('guardando partida ' + JSON.stringify(mapa));
		console.log(`${this.mapaRestUrl}`)
		return this.http.post(`${this.mapaRestUrl}`,
			JSON.stringify(mapa),
			{ headers: this.getHeaders() }).toPromise()
			.then(response =>response)
			.catch(this.handleError);
  }

  get(id:any): Promise<any> { //service para traer un mapa
    return this.http.get(`${this.mapaResourceUrl}/`+ id)
              .toPromise()
              .then(response => response as any)
              .catch(this.handleError);
  }

  findByGameSetId(id:any): Promise<any[]> { //service para traer un mapa
    return this.http.get<{_embedded:{mapas:any}}>(`${this.mapaResourceUrl}/search/findByGameSetId?gameSetId=`+ id)
              .toPromise()
              .then(response => response._embedded.mapas as any[])
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
