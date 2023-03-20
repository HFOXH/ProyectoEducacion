import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

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
      identificacion: ['',[Validators.required, Validators.maxLength(10)]],
      nombre_completo: ['',[Validators.required, Validators.maxLength(50)]]
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
      next: res => { 
        console.log('exito')
        Swal.fire({
          title: '¡Exito!',
          text: "El dato ha sido agregado satisfactoriamente",
          icon: 'success',
          confirmButtonColor: '#08AF62',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
        },
      error: error => { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          confirmButtonColor: '#dc3545'
        })
        console.log(error);
      }
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
      next: res => { 
        Swal.fire({
          title: '¡Exito!',
          text: "los datos han sido actualizados satisfactoriamente",
          icon: 'success',
          confirmButtonColor: '#08AF62',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      },
      error: error => { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          confirmButtonColor: '#dc3545'
        })
        console.log(error);
      }
    });
  }

  deleteTeacher(id:any){
    this.conexionService.deleteTeacher(id).subscribe({
      next: res => { 
        console.log('exito')
        Swal.fire({
          title: '¡Exito!',
          text: "El dato ha sido eliminado satisfactoriamente",
          icon: 'success',
          confirmButtonColor: '#08AF62',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      },
      error: error => { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          confirmButtonColor: '#dc3545'
        })
        console.log(error);
      }
    });
  }
}
