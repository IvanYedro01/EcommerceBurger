let carritoDOM = document.querySelector(".carrito");
let parrafo = document.createElement("p");
parrafo.innerText = "Contenido del carrito";
carritoDOM.append(parrafo);
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];


let botonesAgregar = document.querySelector(".botones-agregar");

for (let i = 0; i < 3; i++) {
    let boton = document.createElement('button');
    boton.innerText = "Agregar ";
    boton.id = "btn" + (i + 1);
    botonesAgregar.append(boton);
}

let botonesEliminar = document.querySelector('.botones-eliminar');

for (let x = 0; x < 3; x++) {
    let botonEliminar = document.createElement('button');
    botonEliminar.innerText = "Eliminar ";
    botonEliminar.id = "btnEliminar" + (x + 1);
    botonesEliminar.append(botonEliminar);
}

let botonVaciar = document.querySelector(".boton-vaciarCarrito");
let botonVaciarCarrito = document.createElement("button");
botonVaciarCarrito.innerText = "Vaciar Carrito";
botonVaciarCarrito.id = "btnVaciar";
botonVaciar.append(botonVaciarCarrito);


let allBurgers = [];


function AgregarAlCarrito(valor) {

    if (valor === 1) {
        const existe = carrito.some(producto => producto.id === allBurgers[0].id);
        const productoEnCarrito = carrito.find(item => item.id === allBurgers[0].id);

        if (existe) {
            productoEnCarrito.cantidad++;
        }
        else {
            carrito.push({ ...allBurgers[0], cantidad: 1 });
        }

        LlenarCarritoDOM();
        Swal.fire({
            title: "Agregado con exito",
            text: "Se ha agregado la burger al carrito",
            icon: "success"
        });
    } else if (valor === 2) {
        const existe = carrito.some(producto => producto.id === allBurgers[1].id);
        const productoEnCarrito = carrito.find(item => item.id === allBurgers[1].id);

        if (existe) {
            productoEnCarrito.cantidad++;
        }
        else {
            carrito.push({ ...allBurgers[1], cantidad: 1 });
        }

        LlenarCarritoDOM();
        Swal.fire({
            title: "Agregado con exito",
            text: "Se ha agregado la burger al carrito",
            icon: "success"
        });
    } else if (valor === 3) {
        const existe = carrito.some(producto => producto.id === allBurgers[2].id);
        const productoEnCarrito = carrito.find(item => item.id === allBurgers[2].id);

        if (existe) {
            productoEnCarrito.cantidad++;
        }
        else {
            carrito.push({ ...allBurgers[2], cantidad: 1 });
        }

        LlenarCarritoDOM();
        Swal.fire({
            title: "Agregado con exito",
            text: "Se ha agregado la burger al carrito",
            icon: "success"
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    MostrarCarrito();
}

function LlenarCarritoDOM() {
    carritoDOM.innerHTML = "<p>Contenido del carrito</p>";
    carrito.forEach(item => {
        let lista = document.createElement("li");
        lista.innerText = `${item.nombre} $${item.precio} x ${item.cantidad}`;
        carritoDOM.appendChild(lista);
    });
    TotalCarrito();
}



function MostrarCarrito() {
    carritoDOM.innerHTML = "<p>Contenido del carrito</p>";
    carrito.forEach((item) => {
        let lista = document.createElement("li");
        lista.innerText = item.nombre + " $" + item.precio + "" + " x " + item.cantidad;
        carritoDOM.appendChild(lista);
    });
    TotalCarrito();
}


function TotalCarrito() {
    let suma = carrito.reduce((accumulador, item) => accumulador + (item.precio * item.cantidad), 0);
    let totalCarritoDOM = document.querySelector(".total>p");
    totalCarritoDOM.innerText = "Total del carrito : $" + suma;
}



function EliminarUltimoProducto(valor) {

    const productoEnCarrito = carrito.find(item => item.id === allBurgers[valor].id);

    if (productoEnCarrito) {

        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad -= 1;
        } else {
            const indice = carrito.indexOf(productoEnCarrito);
            carrito.splice(indice, 1);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        TotalCarrito();
        MostrarCarrito();

        Swal.fire({
            title: "Eliminado con exito",
            text: "Se ha eliminado la burger del carrito",
            icon: "success"
        });

    } else {
        Swal.fire({
            title: "No hay burger suficiente para eliminar",
            text: "Esta burger no está en el carrito",
            icon: "error"
        });
    }
}

let productos = document.querySelector(".productos");

function cargarProductos() {
    fetch("../productos.json")
        .then(response => response.json())
        .then(datos => {
            allBurgers = datos;
            datos.forEach(post => {
                const div = document.createElement("div");
                div.classList.add("estilado-producto");
                div.id = post.id;
                div.innerHTML = `
                    <p>ID: ${post.id}</p>
                    <h2>Burguer: ${post.nombre}</h2>
                    <p>Precio: ${post.precio}</p>
                    <img src="${post.img}" class="estilado-burguer"></img>
                `;
                productos.append(div);

            });

        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cargar los productos: ' + error.message
            });
        });

}



cargarProductos();


let button = document.querySelector(".boton-dark-mode");

button.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});



const boton01 = document.getElementById('#btn1');
const boton02 = document.querySelector('#btn2');
const boton03 = document.querySelector('#btn3');

const botonesAgregarEvento = document.querySelectorAll('.botones-agregar button');
const botonesEliminarEvento = document.querySelectorAll('.botones-eliminar button');
const botonVaciarCarritoEvento = document.querySelectorAll('.boton-vaciarCarrito button');


function eventoAgregar() {

    MostrarCarrito();

    botonesAgregarEvento.forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.currentTarget.id === 'btn1') {
                AgregarAlCarrito(1);
            }
            else if (event.currentTarget.id === 'btn2') {
                AgregarAlCarrito(2);
            }
            else if (event.currentTarget.id === 'btn3') {
                AgregarAlCarrito(3);
            }

        });
    });

}

eventoAgregar();


function eventoEliminar() {

    MostrarCarrito();


    botonesEliminarEvento.forEach(button => {
        button.addEventListener('click', (event) => {

            if (event.currentTarget.id === 'btnEliminar1') {
                EliminarUltimoProducto(0);
            }
            else if (event.currentTarget.id === 'btnEliminar2') {
                EliminarUltimoProducto(1);
            }
            else if (event.currentTarget.id === 'btnEliminar3') {
                EliminarUltimoProducto(2);
            }

        });
    });
}

eventoEliminar();


function VaciarCarrito() {

    botonVaciarCarritoEvento.forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.currentTarget.id === 'btnVaciar' && carrito.length > 0) {
                carrito.length = 0;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                MostrarCarrito();
                TotalCarrito();

                Swal.fire({
                    title: "Carrito vacio",
                    text: "Todos las burgers han sido eliminadas del carrito",
                    icon: "success"
                });
            }
            else {
                Swal.fire({
                    title: "Carrito sin burgers",
                    text: "No hay burgers para eliminar",
                    icon: "error"
                });
            }


        })
    })

}


VaciarCarrito();