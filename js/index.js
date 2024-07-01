class Cervezas{
    constructor(nombre, estilo, peso, medida, precio){
        this.nombre = nombre,
        this.estilo = estilo,
        this.peso = peso,
        this.medida = medida,
        this.precio = precio
    };
}


const cerveza1 = new Cervezas("Aurora", "ipa", 1, "L", 5000);
const cerveza2 = new Cervezas("Dragon", "red-ale", 1, "L", 4500);
const cerveza3 = new Cervezas("Lobo", "stout", 1, "L", 4200);
const cerveza4 = new Cervezas("Centauro", "belgian", 1, "L", 4800);


const btnIpa = document.getElementById("btn-ipa");
const btnStout = document.getElementById("btn-stout");
const btnRed = document.getElementById("btn-red");
const btnBel = document.getElementById("btn-bel");



let carrito = [];
const buyContainer = document.getElementById("buy-container");
let beerCounter = 0;

function agregarAlCarrito (cerveza){
    carrito.push(cerveza);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoCliente(cerveza);
};

function actualizarCarritoCliente(cerveza){
    const carritoCliente = document.createElement('article');
    beerCounter++;
    carritoCliente.id = `${cerveza.estilo}-${beerCounter}`;
    carritoCliente.className = `${cerveza.estilo}`;
    carritoCliente.innerHTML = `<h3>
                                ${cerveza.nombre} ${cerveza.estilo}, ${cerveza.peso} ${cerveza.medida} Precio: $${cerveza.precio}
                                </h3>
                                <button id="btndelete-${beerCounter}" class="btn-delete">Eliminar</button>
                                    `;
    buyContainer.appendChild(carritoCliente);



    // Borrar del DOM y del Storage

    const btnDelete = document.getElementById(`btndelete-${beerCounter}`);
    btnDelete.addEventListener('click', (e) =>{
        const id = e.target.id.split('-')[1];
        document.getElementById(`${cerveza.estilo}-${id}`).remove();


        const index = carrito.findIndex(c => c.nombre === cerveza.nombre && c.estilo === cerveza.estilo && c.peso === cerveza.peso && c.medida === cerveza.medida && c.precio === cerveza.precio);

        if ( index !== -1){
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    })
}



// cargar carrito desde el storage

function cargaCarritoDesdeLocalStorage(){
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carritoGuardado;
    carrito.forEach(cerveza => actualizarCarritoCliente(cerveza));

}


document.addEventListener('DOMContentLoaded', cargaCarritoDesdeLocalStorage);



btnIpa.addEventListener('click', () => {
       agregarAlCarrito(cerveza1);
        
});

btnRed.addEventListener('click', () => {
        agregarAlCarrito(cerveza2);
});

btnStout.addEventListener('click', () =>{
        agregarAlCarrito(cerveza3);
});

btnBel.addEventListener(`click`, () => {
        agregarAlCarrito(cerveza4);
});