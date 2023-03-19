import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private enlace = 'https://localhost:7248/api/';

  private EstudianteUrl = this.enlace +'Estudiante/';
  private ProfesorUrl = this.enlace +'Profesor/';
  private NotasUrl = this.enlace +'Nota/';

  constructor(private http: HttpClient) { }
  // - - - Estudiante - - - 
  getAllStudents(): Observable<any> {
    return this.http.get(this.EstudianteUrl);
  }
  postStudent(datos: any) {
    return this.http.post(this.EstudianteUrl, datos);
  }
  getStudent(Id: number): Observable<any> {
    return this.http.get(this.EstudianteUrl + Id);
  }
  putStudent(Id: number, datos: any){
    return this.http.put(this.EstudianteUrl+ Id, datos);
  }
  deleteStudent(Id: number) {
    return this.http.delete(this.EstudianteUrl + Id);
  }
  // - - - - Profesor - - - 
  getAllTeachers(): Observable<any> {
    return this.http.get(this.ProfesorUrl);
  }
  postTeacher(datos: any) {
    return this.http.post(this.ProfesorUrl, datos);
  }
  getTeacher(Id: number): Observable<any> {
    return this.http.get(this.ProfesorUrl + Id);
  }
  putTeacher(Id: number, datos: any){
    return this.http.put(this.ProfesorUrl+ Id, datos);
  }
  deleteTeacher(Id: number) {
    return this.http.delete(this.ProfesorUrl + Id);
  }
  // - - -  - Notas - - - - 
  getAllNotes(): Observable<any> {
    return this.http.get(this.NotasUrl);
  }
  postNote(datos: any) {
    return this.http.post(this.NotasUrl, datos);
  }
  getNote(Id: number): Observable<any> {
    return this.http.get(this.NotasUrl + Id);
  }
  putNote(Id: number, datos: any){
    return this.http.put(this.NotasUrl+ Id, datos);
  }
  deleteNote(Id: number) {
    return this.http.delete(this.NotasUrl + Id);
  }
}
