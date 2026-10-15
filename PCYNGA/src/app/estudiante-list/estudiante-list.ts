import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './estudiante-list.html',
  styleUrl: './estudiante-list.css'
})
export class EstudianteList implements OnInit {
  private http = inject(HttpClient);
private url = 'estudiante.json';

  estudiantes: Estudiante[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.http.get<Estudiante[]>(this.url).subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la API.';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}