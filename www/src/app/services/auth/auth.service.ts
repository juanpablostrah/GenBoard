import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
// import { AppConfig } from 'app/config/app.config';
import { Credentials } from './credentials.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import gql from 'graphql-tag';

export const GraphQLUrl = 'http://localhost:3000/graphql';

@Injectable()
export class AuthService {
  private headers: HttpHeaders;
  private translations: any;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.translateService
      .get(['heroCreated', 'saved', 'heroLikeMaximum', 'heroRemoved'], {
        value: 5
      })
      .subscribe(texts => {
        this.translations = texts;
      });

    // this.apollo.create({
    //   link: httpLink.create({ uri: GraphQLUrl }),
    //   cache: new InMemoryCache()
    // });
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

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = 5;//AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
