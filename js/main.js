let button = document.querySelector("button");
let div01 = document.querySelector(".producto01");
let div02 = document.querySelector(".producto02");
let div03 = document.querySelector(".producto03");

button.addEventListener("click", function () {
    div01.classList.toggle("caja");
    div02.classList.toggle("caja");
    div03.classList.toggle("caja");
    document.body.classList.toggle("dark-mode");
});

const Burgers = [
    {
        id: "01",
        nombre: "cuarto de libra",
        precio: 10000,
    },
    {
        id: "02",
        nombre: "grand tasty",
        precio: 14000,
    },
    {
        id: "03",
        nombre: "grand leyenda",
        precio: 16500,
    }
];

for (const element of Burgers) {
    console.log(element);
}

let carritoDOM = document.querySelector(".carrito");
let parrafo = document.createElement("p");
parrafo.innerText = "Contenido del carrito";
carritoDOM.append(parrafo);

const carrito = [];

function AgregarAlCarrito() {
    alert("Bienvenidos al menu principal, a continuacion cargue el id del producto que desea agregar, si escribe otro numero que no esta finalizara la aplicacion ");
    while (true) {
        alert("Si desea eliminar el ultimo ponga 0");
        let opcion = parseInt(prompt("1. Cuarto de libra $10.000 / 2. Grand tasty $14.000 / 3. Grand leyenda $16.500"));

        if (opcion === 1) {
            carrito.push(Burgers[0]);
            LlenarCarritoDOM(0);
        }
        else if (opcion === 2) {
            carrito.push(Burgers[1]);
            LlenarCarritoDOM(1);
        }
        else if (opcion === 3) {
            carrito.push(Burgers[2]);
            LlenarCarritoDOM(2);
        }
        else if (opcion === 0) {
            EliminarUltimoProducto();
        }
        else {
            console.log("Opción inválida o salida solicitada.");
            break;
        }
    }
}

function LlenarCarritoDOM(posicion) {
    let lista = document.createElement("li");
    lista.innerText = Burgers[posicion].nombre + " $" + Burgers[posicion].precio;
    carritoDOM.appendChild(lista);
}

function MostrarCarrito() {
    console.log("Contenido del carrito:");
    console.log(carrito);
    TotalCarrito();
}

function TotalCarrito() {
    let suma = 0;
    for (let i = 0; i < carrito.length; i++) {
        suma += carrito[i].precio;
    }
    console.log("Total del carrito: $", suma);
    console.log("Total de productos agregados al carrito: ", carrito.length)

    let totalCarritoDOM = document.querySelector(".total>p");
    totalCarritoDOM.innerText = "Total del carrito : $" + suma;
}

function EliminarUltimoProducto() {
    carrito.pop();
    if (carritoDOM.lastChild) {
        carritoDOM.removeChild(carritoDOM.lastChild);
    }
    TotalCarrito();
}

AgregarAlCarrito();
MostrarCarrito();

