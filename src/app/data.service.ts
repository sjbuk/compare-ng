import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://localhost:3010/api/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};


@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response): any {
        const body = res;
        return body || {};
    }

    // CRUD
    getComparisons(group?: string): Observable<any> {
        const url: string = (typeof group === 'undefined' || group === '') ? '/comparisons' : `/comparisons/${group}`
        return this.http.get(endpoint + url).pipe(
            map(this.extractData));
    }

    getGroups(): Observable<any> {
        return this.http.get(endpoint + '/groups').pipe(
            map(this.extractData));
    }



    addComparison(comparison): Observable<any> {
        console.log(comparison);
        return this.http.post<any>(endpoint + 'comparison', JSON.stringify(comparison), httpOptions).pipe(
            tap((comparison) => console.log(`added comparison w/ id=${comparison.id}`)),
            catchError(this.handleError<any>('addComparison'))
        );
    }
    // CRUD


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
