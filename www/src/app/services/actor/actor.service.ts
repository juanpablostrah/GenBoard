import { Injectable }    from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Actor } from 'app/routes/actor/actor';
import { AppConfig } from 'app/config/app.config';

@Injectable()
export class ActorService {
	private apiUrl = AppConfig.endpoints.api;
	private apiResourceUrl = AppConfig.endpoints.apiResource;
	private actorRestUrl = this.apiUrl + '/actor';  // path del controller
	private actorResourceUrl = this.apiResourceUrl + '/actor';  // path del controller

	localStorage: Storage;

	constructor(private http: HttpClient) {
		this.localStorage = window.localStorage;
	}

  save(actor: Actor): Promise<Actor> { //service para crear un actor

		console.log('creando actor ' + JSON.stringify(actor));
		console.log(`${this.actorRestUrl}`)
		return this.http.post(`${this.actorRestUrl}`,
			JSON.stringify(actor),
			{ headers: this.getHeaders() }).toPromise()
			.then(response =>response)
			.catch(this.handleError);
  }

	get(id:any): Promise<Actor> { //service para traer un actor
    return this.http.get(`${this.actorRestUrl}/getById/`+ id)
              .toPromise()
              .then(response => response as Actor)
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
