import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ICompare } from './interfaces';


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
    getComparisons(group?: string): Observable<ICompare[]> {
        const url: string = (typeof group === 'undefined' || group === '') ? '/comparisons' : `/comparisons/${group}`;
        return this.http.get<ICompare[]>(endpoint + url)
        .pipe(
            catchError(this.handleError<ICompare[]>('getComparisons', []))
        );
    }

    getGroups(): Observable<string[]> {
        return this.http.get<string[]>(endpoint + '/groups')
        .pipe(
            catchError(this.handleError<string[]>('getGroups', []))
            );
    }



    addComparison(comparison: ICompare): Observable<string> {
        const url = endpoint + 'comparison';
        return this.http.post<any>(url, JSON.stringify(comparison), httpOptions).pipe(
            catchError(this.handleError<string>('addComparison'))
        );
    }

    updateComparison(comparison: ICompare): Observable<ICompare> {
        const url = endpoint + `comparison/${comparison._id}`;
        return this.http.put<any>(url, comparison , httpOptions).pipe(
            catchError(this.handleError<ICompare>('updateComparison'))
        );
    }
    deleteComparison(id: string): Observable<string> {
        const url = endpoint + `comparison/${id}`;
        return this.http.delete<string>(url, httpOptions ).pipe(
            catchError(this.handleError<string>('deleteComparison'))
        );
    }

    runCompare(id: string): void{
        const url = endpoint + `compare/${id}`;
        this.http.get<any>(url, httpOptions ).subscribe( (res) => {
        });
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
