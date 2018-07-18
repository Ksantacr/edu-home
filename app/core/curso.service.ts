import { Injectable } from "@angular/core";
import { Curso } from "../shared/curso.model";


@Injectable()
export class CursoService {

    private cursos = new Array<Curso>(
        {
            id: 1,
            nombre: "Lenguaje y Comunicación",
            imagen: "http://www.smpilar.es/wp-content/uploads/2015/12/fondo-smp.jpg",
            cantidadTareas: 2
        },
        {
            id: 2,
            nombre: "Matemáticas",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1h_vSUSMaoXdjZVAyM03dqMQPUw735VXw4jGM8a_iWlz5TTf",
            cantidadTareas: 0
        },
        {
            id: 3,
            nombre: "Inglés Avanzado",
            imagen: "https://cdn.pixabay.com/photo/2015/09/03/05/52/green-background-920072_960_720.jpg",
            cantidadTareas: 1
        },
        {
            id: 4,
            nombre: "Emprendimiento",
            imagen: "https://image.freepik.com/foto-gratis/concepto-de-educacion-regreso-a-la-escuela-en-el-fondo-de-la-pizarra_43429-1.jpg",
            cantidadTareas: 2
        }
    );

    getCursos(): Array<Curso> {
        return this.cursos;
    }

    getCurso(id: number): Curso {
        return this.cursos.filter((curso) => curso.id === id)[0];
    }
}
