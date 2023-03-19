import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit{
  formularioEditar: FormGroup;
  formularioAgregar: FormGroup;
  students: any;
  id: any;
  names: any;
  idEstudiante: any;
  namesEstudiante: any;

  constructor(public formBuilder: FormBuilder, private conexionService: ConexionService){
    this.formularioEditar = this.formBuilder.group({
      identificacion: [''],
      nombre_completo: ['']
    });
    this.formularioAgregar = this.formBuilder.group({
      identificacion: ['', [Validators.required, Validators.maxLength(10)]],
      nombre_completo: ['',[Validators.required,Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.conexionService.getAllStudents().subscribe({
      next: data => { this.students = data;},
      error: error => { console.log(error);}
    });
  }

  addStudent(idEstudiante: any, namesEstudiante: any){
    let datos = {
      id: idEstudiante,
      nombre: namesEstudiante
    }
    console.log(datos);
    this.conexionService.postStudent(datos).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

  editStudent(id: any){
    this.conexionService.getStudent(id).subscribe(
      respuesta => {
        this.formularioEditar.setValue({
          identificacion: respuesta.id,
          nombre_completo: respuesta.nombre
        });
      }
    );
  }

  async updateStudent(id:any, names:any){
    let datos = {
      id: id,
      nombre: names
    };
    this.conexionService.putStudent(id, datos).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }

  deleteStudent(id:any){
    this.conexionService.deleteStudent(id).subscribe({
      next: res => { console.log('exito'); window.location.reload();},
      error: error => { console.log(error);}
    });
  }
}
