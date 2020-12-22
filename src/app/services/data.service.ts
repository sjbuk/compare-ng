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
    getComparisons(group?: string): Observable<any> {
        const url: string = (typeof group === 'undefined' || group === '') ? '/comparisons' : `/comparisons/${group}`;
        return this.http.get(endpoint + url).pipe(
            map(this.extractData));
    }

    getGroups(): Observable<any> {
        return this.http.get(endpoint + '/groups').pipe(
            map(this.extractData));
    }



    addComparison(comparison: ICompare): void {
        const url = endpoint + 'comparison';
        console.log(comparison);
        this.http.post<any>(url, JSON.stringify(comparison), httpOptions).subscribe( (res) => {
        });
    }

    updateComparison(comparison: ICompare): void {
        const url = endpoint + `comparison/${comparison._id}`;
        const reqData: string = JSON.stringify(comparison);
        this.http.put<any>(url, reqData , httpOptions).subscribe( (res) => {
        });
    }
    deleteComparison(id: string): void {
        const url = endpoint + `comparison/${id}`;
        this.http.delete<any>(url, httpOptions ).subscribe( (res) => {
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
