// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaDeCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso apretando "Agregar al Carrito"
    listaDeCursos.addEventListener('click', agregarCurso);
    vaciarCarritoBtn.addEventListener('click', () => { 
        articulosCarrito = [];
        vaciarCarritoHTML();
    });
    
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso    
function leerDatosCurso(curso) {        
        const infoCurso = {
            imagen: curso.querySelector('img').src,
            nombre: curso.querySelector('h4').textContent,
            precio: curso.querySelector('p.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        const existe = articulosCarrito.some( articulo => articulo.id === infoCurso.id);

        if(existe){

            articulosCarrito = articulosCarrito.map( articulo => {
                if(articulo.id === infoCurso.id){
                    articulo.cantidad++;
                }
                return articulo;
            });

        } else{
            articulosCarrito = [...articulosCarrito, infoCurso];
        }

        console.log(articulosCarrito);

        carritoHTML(articulosCarrito);       

}

function carritoHTML(articulos){

    vaciarCarritoHTML();

    // sumarRepetidos();
    
    articulos.forEach( articulo => {
        const row = document.createElement('tr');

        const { imagen, nombre, precio, cantidad, id } = articulo;

        row.innerHTML = `
            <td>
                <img src="${imagen}" width='100'>
            </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class='borrar-curso data-id='${id}' onClick="borrarCurso(${id})">X</a>
            </td>    
        `;

        contenedorCarrito.appendChild(row);
    })
}

function vaciarCarritoHTML(){
    // Forma lenta
    // contenedorCarrito.textContent = "";

    // Forma Rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function borrarCurso(id){ 
    articulosCarrito = articulosCarrito.filter(articulo => articulo.id != id );

    carritoHTML(articulosCarrito);    
}