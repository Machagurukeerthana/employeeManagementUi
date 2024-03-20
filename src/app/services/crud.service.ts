import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public languageJSON = new BehaviorSubject<any>(null);
	public language$ = this.languageJSON.asObservable();

  constructor(private http: HttpClient) { }

  	// set's language json
	public setLanguageJSON(languageObs:any): void {
		languageObs.subscribe((data:any) => {
			this.languageJSON.next(data);
		});
	}

	public getData(url: string): Observable<any> {
		return this.http.get(environment.API_ENDPOINT + url,{});
	}

	public deleteData(url: string): Observable<any> {
		return this.http.delete(environment.API_ENDPOINT + url);
	}

	public saveData(url: string, body: any): Observable<any> {
		return this.http.post(environment.API_ENDPOINT + url, body);
	}

	saveBinaryData(url: string,data: any): Observable<any> {
		const headers = { 'removeheader': 'true' };
		return this.http.post(environment.API_ENDPOINT + url, data, { headers });
	}

	updateBinaryData(url: string,data: any): Observable<any> {
		const headers = { 'removeheader': 'true' };
		return this.http.put(environment.API_ENDPOINT + url, data, { headers });
	}

	public updateData(url: string, body: any): Observable<any> {
		return this.http.put(environment.API_ENDPOINT + url, body);
	}



}
