import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// IMPORT LOCAL
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoresService {

    // Define
    apiUrl: string = environment.apiUrl;

    constructor(
        private httpClient: HttpClient) {

    }

    // Fetch all Vehicles
    getVehicles(): Observable<any> {
        const fetchUrl = this.apiUrl + 'vehicles/';
        return this.httpClient.get(fetchUrl)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

    // Fetch vehicles detail
    getVehiclesDetail(fetchUrl: string = ''): Observable<any> {
        return this.httpClient.get(fetchUrl)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }

}
