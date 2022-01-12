/**
 * Arquivo responsável por realizar as transações de request entre Front e Back
 * Doc HttpClient Angular: https://angular.io/api/common/http/HttpClient#http-request-example
 */

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import Reader from "../interfaces/Reader";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReadersService {

  constructor(private http: HttpClient) { }

  /**
   * Método responsável por criar um novo reader
   */
  createNewReader(reader: Reader): Observable<any> {
    // (POST - url no back-end): http://localhost:3000/api/readers
    return this.http.post(`${environment.baseUrl}/readers`, reader)
  }

  /**
   * Método responsável por listar todos os readers
   */
  getReaders(): Observable<any> {
    // (GET - url no back-end): http://localhost:3000/api/readers
    return this.http.get(`${environment.baseUrl}/readers`)
  }

  /**
   * Método responsável por atualizar um determinado reader por ID
   */
  getReader(id: number): Observable<any> {
    // (GET - url no back-end): http://localhost:3000/api/readers/:id
    return this.http.get(`${environment.baseUrl}/readers/${id}`)
  }

  /**
   * Método responsável pela action do botão Update no arquivo 'reader-edit.component.html'
   */
  updateReader(reader: Reader): Observable<any> {
    // (PUT - url no back-end): http://localhost:3000/api/readers/:id
    return this.http.put(`${environment.baseUrl}/readers/${reader.id_reader}`, reader)
  }

  /**
   * Método responsável por excluir um reader pelo id:
   */
  deleteReader(id: number): Observable<any> {
    // (DELETE - url no back-end): http://localhost:3000/api/readers/:id
    return this.http.delete(`${environment.baseUrl}/readers/${id}`)
  }
}
