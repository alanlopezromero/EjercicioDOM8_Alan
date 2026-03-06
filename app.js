// Seleccion de elementos

const form = document.querySelector("#formTarea");
const inputTitulo = document.querySelector("#inputTitulo");
const selectTag = document.querySelector("#selectTag");

const lista = document.querySelector("#listaTareas");

const inputBuscar = document.querySelector("#inputBuscar");
const btnLimpiar = document.querySelector("#btnLimpiarBuscar");

const chips = document.querySelectorAll(".chip");

const statTotal = document.querySelector("#statTotal");
const statVisibles = document.querySelector("#statVisibles");
const statFavs = document.querySelector("#statFavs");

const emptyState = document.querySelector("#emptyState");

// Variables de estado es pra que agacomo tipo contador

let filtroActual = "all";
let contador = 4;



// Agregar nueva tarea 

form.addEventListener("submit", function(e){

  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const tag = selectTag.value;

  if(titulo === "") return;

  const li = document.createElement("li");

  li.className = "card";
  li.dataset.id = "t" + contador++;
  li.dataset.tag = tag;
  li.dataset.fav = "0";

  li.innerHTML = `
  <div class="card__head">
    <span class="badge">${tag}</span>
    <div class="actions">
      <button class="icon" type="button" data-action="fav">☆</button>
      <button class="icon" type="button" data-action="done">✓</button>
      <button class="icon danger" type="button" data-action="del">🗑</button>
    </div>
  </div>
  <p class="card__title">${titulo}</p>
  `;

  lista.appendChild(li);

  inputTitulo.value = "";

});


// DELEGACION DE EVENTOS
lista.addEventListener("click", function(e) {

  const boton = e.target.closest("button");
  if (!boton) return;

  const card = boton.closest(".card");
  const accion = boton.dataset.action;



  //son condiciones que tienen acciones

  // ELIMINAR
  if (accion === "del") {
    card.remove();
  }



  // COMPLETADA
  if (accion === "done") {
    card.classList.toggle("done");
  }



  // FAVORITA
  if (accion === "fav") {

    if (card.dataset.fav === "0") {
      card.dataset.fav = "1";
      boton.textContent = "★";
    } else {
      card.dataset.fav = "0";
      boton.textContent = "☆";
    }

  }

  aplicarFiltros();

});




// FILTROS
chips.forEach(chip => {

  chip.addEventListener("click", function(){

    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    filtroActual = chip.dataset.filter;

    aplicarFiltros();

  });

});




// BUSQUEDA
inputBuscar.addEventListener("input", aplicarFiltros);




// LIMPIAR BUSQUEDA
//el boton limpiar tiene  una funcion donde imputBucar.value  tiene de valor  nada por lo consiguiente asi se queda
btnLimpiar.addEventListener("click", function(){

  inputBuscar.value = "";
  aplicarFiltros();

});





function aplicarFiltros(){

  const texto = inputBuscar.value.toLowerCase();

  const cards = document.querySelectorAll(".card");

  let visibles = 0;
  let favs = 0;

  cards.forEach(card => {

    const titulo = card.querySelector(".card__title").textContent.toLowerCase();
    const tag = card.dataset.tag;
    const fav = card.dataset.fav === "1";



    let cumpleFiltro = false;



    if (filtroActual === "all") {
      cumpleFiltro = true;
    }

    if (filtroActual === tag) {
      cumpleFiltro = true;
    }

    if (filtroActual === "fav" && fav) {
      cumpleFiltro = true;
    }



    const cumpleBusqueda = titulo.includes(texto);



    if (cumpleFiltro && cumpleBusqueda) {
      card.style.display = "";
      visibles++;
    } else {
      card.style.display = "none";
    }



    if (fav) favs++;

  });




  // ESTADISTICAS
  statTotal.textContent = cards.length;
  statVisibles.textContent = visibles;
  statFavs.textContent = favs;



  // ESTADO VACIO
  if (visibles === 0) {
    emptyState.classList.remove("is-hidden");
  } else {
    emptyState.classList.add("is-hidden");
  }

}



// INICIALIZAR
aplicarFiltros();