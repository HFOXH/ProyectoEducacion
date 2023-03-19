import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit{
  formularioEditar: FormGroup;
  formularioAgregar: FormGroup;
  teachers: any;
  id: any;
  names: any;
  idProfesor: any;
  namesProfesor: any;

  constructor(public formBuilder: FormBuilder, private conexionService: ConexionService){
    this.formularioEditar = this.formBuilder.group({
      identificacion: [''],
      nombre_completo: ['']
    });
    this.formularioAgregar = this.formBuilder.group({
      identificacion: [''],
      nombre_completo: ['']
    });
  }

  ngOnInit(): void {
    this.conexionService.getAllTeachers().subscribe({
      next: data => { this.teachers = data;},
      error: error => { console.log(error);}
    });
  }

  addTeacher(idProfesor: any, namesProfesor: any){
    let datos = {
      id: idProfesor,
      nombre: namesProfesor
    }
    console.log(datos);
    this.conexionService.postTeacher(datos).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

  editTeacher(id: any){
    this.conexionService.getTeacher(id).subscribe(
      respuesta => {
        this.formularioEditar.setValue({
          identificacion: respuesta.id,
          nombre_completo: respuesta.nombre
        });
      }
    );
  }

  async updateTeacher(id:any, names:any){
    let datos = {
      id: id,
      nombre: names
    };
    this.conexionService.putTeacher(id, datos).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

  deleteTeacher(id:any){
    this.conexionService.deleteTeacher(id).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }
}
