const Burgers = [
    {
        id: "01",
        nombre: "cuarto de libra",
        precio: 10000,
        img: "../assets/Cuarto_de_libra.webp",
    },
    {
        id: "02",
        nombre: "grand tasty",
        precio: 14000,
        img: "../assets/Grand_tasty.png",
    },
    {
        id: "03",
        nombre: "grand leyenda",
        precio: 16500,
        img: "../assets/Grand_leyenda.png",
    }
];


let carritoDOM = document.querySelector(".carrito");
let parrafo = document.createElement("p");
parrafo.innerText = "Contenido del carrito";
carritoDOM.append(parrafo);
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const bienvenida = document.querySelector(".bienvenida");
const parrafoBienvenida = document.createElement("p");
parrafoBienvenida.classList.add("parrafoBievenida-estilado");
parrafoBienvenida.innerText = "Bienvenidos al menu principal, a continuacion cargue el id del producto que desea agregar, si escribe otro numero que no esta finalizara la aplicacion ";
bienvenida.prepend(parrafoBienvenida);


const opcionEliminar = document.querySelector(".opcionEliminar");
opcionEliminar.classList.add("opcionEliminar-estilado")
opcionEliminar.innerText = "Si desea eliminar el ultimo ponga 0";



let productos = document.querySelector(".productos");


function AgregarAlCarrito(valor) {

    if (valor === 1) {
        carrito.push(Burgers[0]);
        LlenarCarritoDOM(0);
        Swal.fire({
            title: "Agregado con exito",
            text: "Se ha agregado un producto al carrito",
            icon: "success"
          });
    } else if (valor === 2) {
        carrito.push(Burgers[1]);
        LlenarCarritoDOM(1);
        Swal.fire({
            title: "Agregado con exito",
            text: "Se ha agregado un producto al carrito",
            icon: "success"
          });
    } else if (valor === 3) {
        carrito.push(Burgers[2]);
        LlenarCarritoDOM(2);
        Swal.fire({
            title: "Agregado con exito",
            text: "Se ha agregado un producto al carrito",
            icon: "success"
          });
    } else if (valor === 0 && carrito.length <= 0) {
        Swal.fire({
            title: "Productos insuficientes",
            text: "No hay productos para eliminar",
            icon: "error"
          });
    } else if (valor === 0 && carrito.length > 0) {
        EliminarUltimoProducto();
        Swal.fire({
            title: "Eliminado con exito",
            text: "Se ha eliminado el ultimo producto del carrito",
            icon: "success"
          });
    } else if(valor > 3) {
        Swal.fire({
            title: "Advertencia",
            text: "Ingrese un producto valido",
            icon: "error"
          });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    MostrarCarrito();
}


function LlenarCarritoDOM(posicion) {
    carritoDOM.innerHTML = "<p>Contenido del carrito</p>";
    let lista = document.createElement("li");
    lista.innerText = Burgers[posicion].nombre + " $" + Burgers[posicion].precio;
    carritoDOM.appendChild(lista);
}


function MostrarCarrito() {
    carritoDOM.innerHTML = "<p>Contenido del carrito</p>";
    carrito.forEach((item) => {
        let lista = document.createElement("li");
        lista.innerText = item.nombre + " $" + item.precio;
        carritoDOM.appendChild(lista);
    });
    TotalCarrito();
}


function TotalCarrito() {
    // let suma = 0;
    // for (let i = 0; i < carrito.length; i++) {
    //     suma += carrito[i].precio;
    // }
    let suma = carrito.reduce((accumulador, item) => accumulador + item.precio, 0);

    let totalCarritoDOM = document.querySelector(".total>p");
    totalCarritoDOM.innerText = "Total del carrito : $" + suma;
}


function EliminarUltimoProducto() {
    carrito.pop();
    if (carritoDOM.lastChild) {
        carritoDOM.removeChild(carritoDOM.lastChild);
    }
    TotalCarrito();
    MostrarCarrito();
}


function cargarProductos() {

    Burgers.forEach(burguer => {

        const div = document.createElement("div");
        div.classList.add("estilado-producto");
        div.id = burguer.id;
        div.innerHTML = `
            <p>ID: ${burguer.id}</p>
            <h2>Burguer: ${burguer.nombre}</h2>
            <p>Precio: ${burguer.precio}</p>
            <img src=" ${burguer.img}" class="estilado-burguer"></img>
        `;


        productos.append(div);
    });
}


cargarProductos();
AgregarAlCarrito();
MostrarCarrito();


let button = document.querySelector(".boton-dark-mode");
let div = document.querySelectorAll(".estilado-producto");

button.addEventListener("click", function () {

    div.forEach(elemento => {
        elemento.classList.toggle("div-contenedor-productos");
        document.body.classList.toggle("dark-mode");
    });

});

const botonCargar = document.querySelector('.boton-cargar');
const inputValue = document.querySelector('.input');
const resultado = document.querySelector('.resultado');

document.addEventListener('DOMContentLoaded', () => {

    Swal.fire({
        title: "Bienvenido al ecommerce de burgers!",
        text: "A continuacion podra agregar las burgers que quiera al carrito",
        imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/017/503/957/small_2x/hot-burgers-logo-illustration-modern-burgers-emblem-art-free-vector.jpg",
        imageWidth: 1000,
        imageHeight: 400,
        imageAlt: "Custom image"
      });

    inputValue.focus();
    
    if (botonCargar && inputValue && resultado) {

        botonCargar.addEventListener('click', () => {

            const valorInput = parseInt(inputValue.value);
            resultado.textContent = `El valor ingresado es: ${valorInput}`;

            AgregarAlCarrito(valorInput);
        });
    } else {
        resultado.innerText = "No se pudieron encontrar resultados";
    }
});


