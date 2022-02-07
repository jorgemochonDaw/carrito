import {
    contenedorCarrito
} from './../selectores/Selectores.js';

//Almacenamos los cursos seleccionados
let articulosCarrito = [];

//Cargamos lo que tenemos en el localstorage al iniciar la pagina
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();
});

//Cargamos los datos del curso que seleccionamos
export function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}

//Leemos los datos del curso seleccionado
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Nos permite que si hay ya un curso en el carrito este incrementa
    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        //Añadimos el curso al arreglo
        articulosCarrito = [...cursos];
    } else {
        //Añadimos la informacion del curso al arreglo
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

//Eliminamos el curso seleccionado mediante el id que tiene cada curso
export function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

//Creamos el html para mostrar el curso
export function carritoHTML() {
    vaciarCarrito();
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
              <td>  
                   <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
         `;
        contenedorCarrito.appendChild(row);
    });
    sincronizarStorage();
}

//Activamos el almacenimiento del localstorage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Nos permite vaciar el carrito, eliminamos el primer hijo para evitar duplicados
export function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}