// Precios de los productos
const precios = {
    nigiri: 5.00,
    sashimi: 6.00,
    maki: 4.50,
    uramaki: 5.50,
    temaki: 7.00,
    agua: 1.00,
    refresco: 2.00,
    cerveza: 3.50,
    te: 1.50,
    siracha: 0.50,
    ranch: 0.75,
    soya: 0.25
};

let carrito = [];

// Función para calcular el total
function calcularTotal() {
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

// Función para agregar o eliminar productos del carrito
function actualizarCarrito(nombre, precio, cantidad, agregar = true) {
    const itemIndex = carrito.findIndex(item => item.nombre === nombre);

    if (agregar) {
        if (itemIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            carrito[itemIndex].cantidad += cantidad;
        } else {
            // Si no está en el carrito, lo agrega
            carrito.push({ nombre, precio, cantidad });
        }
    } else {
        if (itemIndex !== -1) {
            // Si el producto está en el carrito, lo elimina
            carrito.splice(itemIndex, 1);
        }
    }

    // Actualiza la visualización del carrito y el total
    mostrarCarrito();
    calcularTotal();
}

// Función para mostrar el carrito en la interfaz
function mostrarCarrito() {
    const carritoElemento = document.getElementById("carrito");
    const contenidoCarrito = document.getElementById("contenidoCarrito");

    carritoElemento.innerHTML = "";
    contenidoCarrito.innerHTML = "";

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
        carritoElemento.appendChild(li);

        const p = document.createElement("p");
        p.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
        contenidoCarrito.appendChild(p);
    });
}

// Función para manejar eventos de checkboxes
function manejarCheckboxes(selectorCheckbox, selectorCantidad) {
    document.querySelectorAll(selectorCheckbox).forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            const cantidadInput = document.querySelectorAll(selectorCantidad)[index];
            const cantidad = parseInt(cantidadInput.value) || 1;

            if (checkbox.checked) {
                // Agrega el producto al carrito
                actualizarCarrito(checkbox.value, precios[checkbox.value], cantidad, true);
            } else {
                // Elimina el producto del carrito
                actualizarCarrito(checkbox.value, precios[checkbox.value], cantidad, false);
            }
        });
    });
}

// Función para manejar eventos de inputs
function manejarInputs(selectorInput) {
    document.querySelectorAll(selectorInput).forEach(input => {
        input.addEventListener("input", () => {
            const cantidad = parseInt(input.value) || 0;
            if (cantidad > 0) {
                // Agrega el producto al carrito
                actualizarCarrito(input.id, precios[input.id], cantidad, true);
            } else {
                // Elimina el producto del carrito si la cantidad es 0
                actualizarCarrito(input.id, precios[input.id], cantidad, false);
            }
        });
    });
}

// Eventos para sushi y bebidas
manejarCheckboxes(".sushi", ".cantidadSushi");
manejarCheckboxes(".bebida", ".cantidadBebida");

// Eventos para extras
manejarInputs(".extra");

// Evento para actualizar los campos de pago
document.getElementById("metodoPago").addEventListener("change", function () {
    const metodoSeleccionado = this.value;
    document.getElementById("efectivoInfo").style.display = metodoSeleccionado === "efectivo" ? "block" : "none";
    document.getElementById("transferenciaInfo").style.display = metodoSeleccionado === "transferencia" ? "block" : "none";
});

document.getElementById("cambio").addEventListener("change", function () {
    document.getElementById("montoCambio").style.display = this.value === "feria" ? "block" : "none";
});

// Vaciar carrito
document.getElementById("vaciarCarritoBtn").addEventListener("click", () => {
    carrito = [];
    mostrarCarrito();
    calcularTotal();
});

// Ver carrito
document.getElementById("verCarritoBtn").addEventListener("click", () => {
    const contenido = carrito.map(item => `<p>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</p>`).join("");
    document.getElementById("contenidoCarrito").innerHTML = contenido;
    document.getElementById("modalCarrito").style.display = "block";
});

// Cerrar modal
document.querySelector(".cerrar").addEventListener("click", () => {
    document.getElementById("modalCarrito").style.display = "none";
});

// Cerrar modal al hacer clic fuera de él
window.addEventListener("click", event => {
    const modal = document.getElementById("modalCarrito");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Evento para enviar el pedido
document.getElementById("enviarPedidoBtn").addEventListener("click", event => {
    event.preventDefault();
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de enviar el pedido.");
        return;
    }
    alert("Pedido enviado correctamente.");
    carrito = [];
    mostrarCarrito();
    calcularTotal();
});