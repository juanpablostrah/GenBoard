import { Injectable }    from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CanvasDiceRollService {
	private canvasDiceRollUrl = 'http://localhost:8080/rest/clientes';  // URL del backend

	constructor(private http: HttpClient) {}

	getCliente(id:any): Promise<Cliente> { //metodo para traer un cliente
  	return this.http.get(`${this.clienteUrl}/getById/`+id)
             .toPromise()
             .then(response => response as Cliente)
             .catch(this.handleError);
	}

	getClientes(): Promise<Cliente[]> { //metodo para traer todos los clientes
	  return this.http.get(`${this.clienteUrl}/getAll`)
	             .toPromise()
	             .then(response => response as Cliente[])
	             .catch(this.handleError);
	}

	getClienteByEmail(email:String): Promise<Cliente> {
		return this.http.get(`${this.clienteUrl}/getByEmail/`+ email)
							 .toPromise()
							 .then(response => response as Cliente)
							 .catch(this.handleError);
	}

	save(cliente: Cliente): Promise<Response> {
		console.log('Saving cliente ' + JSON.stringify(cliente));
		console.log(`${this.clienteUrl}/create`)
		return this.http.post(`${this.clienteUrl}/create`, JSON.stringify(cliente)).toPromise()
			.then(response =>response)
			.catch(this.handleError);
}

	update(cliente: Cliente): Promise<Response> { //metodo para guardar un cliente
		console.log('edit cliente ' + JSON.stringify(cliente));
		console.log(`${this.clienteUrl}/edit`)
		return this.http.put(`${this.clienteUrl}/edit`, JSON.stringify(cliente)).toPromise()
			.then(response => response)
			.catch(this.handleError);;
	}

	getSaldo(id:any): Promise<Response> { //metodo para traer saldo de un cliente
		console.log(`${this.clienteUrl}/getCreditos`)
		return this.http.get(`${this.clienteUrl}/getCreditos/`+id)
			.toPromise()
			.then(response =>{
				console.log(response)
				return response
			})
			.catch(this.handleError);;
	}

	saveSaldo(credito: number): Promise<Response> { //metodo para cargar saldo a un cliente
		console.log(`${this.clienteUrl}/cargarCreditos`)
		return this.http.put(`${this.clienteUrl}/cargarCreditos/${credito}`, {})
			.toPromise()
			.then(response =>{
				console.log(response)
				return response
			})
			.catch(this.handleError);;
	}

	private getHeaders() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
		return headers;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
