import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from 'employee.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000/employees'
  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl)
  }
  get(id:any): Observable<Employee>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Employee>(url)
  }
  update( data:any, id:any): Observable<Employee>{
    const url = `${this.apiUrl}/${id}`
    return this.http.put<Employee>(url, data, httpOptions)
  }
  delete(id: any): Observable<Employee>{
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Employee>(url)
  }
  add(data: any): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl,data, httpOptions)
  }

}
