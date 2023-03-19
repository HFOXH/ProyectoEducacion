import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {
  formularioEditar: FormGroup;
  formularioAgregar: FormGroup;
  notes: any;
  id: any;
  name: any;
  idteacher: any;
  idstudent: any;
  note: any;
  name_add: any;
  idteacher_add: any;
  idstudent_add: any;
  note_add: any;
  idNota: any;
  namesEstudiante: any;

  constructor(public formBuilder: FormBuilder, private conexionService: ConexionService){
    this.formularioEditar = this.formBuilder.group({
      identificacion: [''],
      nombre_materia: [''],
      identificacionProfesor: [''],
      identificacionEstudiante: [''],
      valor: ['']
    });
    this.formularioAgregar = this.formBuilder.group({
      nombre_materia_add: [''],
      identificacionProfesor_add: [''],
      identificacionEstudiante_add: [''],
      valor_add: ['']
    });
  }

  ngOnInit(): void {
    this.conexionService.getAllNotes().subscribe({
      next: data => { this.notes = data;},
      error: error => { console.log(error);}
    });
  }

  addNote(name: any, idteacher:any,idstudent:any,note:number){
    let datos = {
      nombre:name,
      idProfesor:idteacher,
      idEstudiante:idstudent,
      valor:note
    }
    console.log(datos);
    this.conexionService.postNote(datos).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

  editNote(id: any){
    this.conexionService.getNote(id).subscribe(
      respuesta => {
        this.formularioEditar.setValue({
          identificacion: respuesta.id,
          nombre_materia: respuesta.nombre,
          identificacionProfesor: respuesta.idProfesor,
          identificacionEstudiante: respuesta.idEstudiante,
          valor: respuesta.valor
        });
      }
    );
  }

  async updateNote(id: any, name: any, idteacher:any,idstudent:any,note:any){
    let datos = {
      id: id,
      nombre:name,
      idProfesor:idteacher,
      idEstudiante:idstudent,
      valor:note
    };
    console.log(datos);
    this.conexionService.putNote(id, datos).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

  deleteNote(id:any){
    this.conexionService.deleteNote(id).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

}
