import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from '../../config/app.config';
import { Partida } from './partida.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export const GraphQLUrl = 'http://localhost:3000/graphql';

@Injectable()
export class PartidasService {
  private headers: HttpHeaders;
  private partidasUrl: string;
  private translations: any;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    console.log('partidas constructor')
    this.partidasUrl = AppConfig.endpoints.partidas;
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.translateService
      .get(['partidaCreated', 'saved', 'partidaLikeMaximum', 'partidaRemoved'], {
        value: AppConfig.votesLimit
      })
      .subscribe(texts => {
        this.translations = texts;
      });

    this.apollo.create({
      link: httpLink.create({ uri: GraphQLUrl }),
      cache: new InMemoryCache()
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  get(id:number){
    return new Promise<Partida>((resolve, reject)=>{
      if(Math.random() > 0.2){
        setTimeout(()=>{
          resolve({
            id: id,
            nombre: 'partida-'+id,
            historia: 'historia-'+id,
            operaciones: this.getRandomInt(0,10)
          })
        }, this.getRandomInt(250,750))
      }
      else{
        setTimeout(()=>{
          reject({status: 404})
        }, this.getRandomInt(250,750))
      }
    })
  }

  save(provedor:Partida){
    return new Promise<number>((resolve, reject)=>{
      if(typeof provedor.id === 'undefined'){
        provedor.id = this.getRandomInt(1,500);
      }
      setTimeout(resolve, this.getRandomInt(250,750))
    })
  }

  getAllPartidas(): Observable<Partida[]> {
    const query = gql`
      query {
        allPartidas {
          id
          name
          alterEgo
          likes
        }
      }
    `;
    return this.query(query).map(response => {
      return response['allPartidas'] as Partida[];
    });
  }

  getPartidaById(partidaId: string): Observable<Partida> {
    const query = gql`
      query partida($input: ID!) {
        partida(id: $input) {
          id
          name
          alterEgo
          likes
        }
      }
    `;
    return this.query(query, { input: partidaId }).map(response => {
      return response['partida'] as Partida;
    });
  }

  like(partida: Partida): Observable<any> {
    if (this.checkIfUserCanVote()) {
      const mutation = gql`
        mutation like($input: LikePartidaInput!) {
          like(input: $input) {
            result
          }
        }
      `;

      return this.mutate(mutation, { input: { partidaId: partida.id } }).map(
        response => {
          localStorage.setItem(
            'votes',
            '' + (Number(localStorage.getItem('votes')) + 1)
          );
          partida.operaciones += 1;
          this.showSnackBar('saved');
          return response;
        }
      );
    } else {
      this.showSnackBar('partidaLikeMaximum');
      return Observable.throw('maximum votes');
    }
  }

  /* Query (read) record(s), matching variables where necessary */
  private query<T>(
    query: any,
    variables: any = {},
    description: string = 'read'
  ): Observable<T> {
    return this.apollo
      .subscribe({ query: query, variables: variables })
      .pipe(
        map(({ data }) => data),
        tap(_ =>
          console.log(
            `${description} record(s) with ${JSON.stringify(variables)}`
          )
        ),
        catchError(
          this.handleError<T>(
            `Query=${JSON.stringify(query)} Variables=${JSON.stringify(
              variables
            )} Description=${description}`
          )
        )
      );
  }

  /** Mutate (create, update or delete) a record on the server */
  private mutate<T>(
    mutation: any,
    variables: any = {},
    description: string = 'mutate'
  ): Observable<T> {
    return this.apollo
      .mutate<T>({ mutation: mutation, variables: variables })
      .pipe(
        map(({ data }) => data),
        tap(_ =>
          console.log(
            `${description} record(s) with ${JSON.stringify(variables)}`
          )
        ),
        catchError(
          this.handleError<T>(
            `Mutate=${JSON.stringify(mutation)} Variables=${JSON.stringify(
              variables
            )} Description=${description}`
          )
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
