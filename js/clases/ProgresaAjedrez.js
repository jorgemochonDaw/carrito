import {
    agregarCurso,
    eliminarCurso,
    vaciarCarrito,
} from './../funciones/Funciones.js';

import {
    listaCursos,
    carrito,
    vaciarCarritoBtn
} from './../selectores/Selectores.js';

class ProgresaAjedrez {
    constructor() {
        this.eventos();
    }
    //Cargamos los eventos de la pagina
    eventos() {
        listaCursos.addEventListener('click', agregarCurso);
        carrito.addEventListener('click', eliminarCurso);
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }
}

export default ProgresaAjedrez;