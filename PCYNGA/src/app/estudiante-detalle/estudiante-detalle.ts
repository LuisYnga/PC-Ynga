import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface Estudiante {
  id: number;
  nombre: string;
  nota1: number;
  nota2: number;
  nota3: number;
}

@Component({
  selector: 'app-estudiante-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './estudiante-detalle.html',
  styleUrl: './estudiante-detalle.css'
})
export class EstudianteDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
private url = 'estudiante.json';

  estudiante?: Estudiante;
  cargando = true;
  error = '';

  suma = 0;
  promedio = 0;
  estado = '';
  observacion = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<Estudiante[]>(this.url).pipe(
      map(lista => lista.find(e => e.id === id))
    ).subscribe({
      next: (e) => {
        if (e) {
          this.estudiante = e;
          this.suma = e.nota1 + e.nota2 + e.nota3;
          this.promedio = this.suma / 3;
          this.estado = this.promedio >= 13 ? 'Aprobado' : 'Desaprobado';

          if (this.promedio >= 17) {
            this.observacion = 'Excelente';
          } else if (this.promedio >= 13) {
            this.observacion = 'Regular';
          } else {
            this.observacion = 'Riesgo';
          }
        } else {
          this.error = 'Estudiante no encontrado.';
        }
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