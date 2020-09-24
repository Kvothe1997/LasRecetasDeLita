var actual; //actual representa el article en el que se ha hecho click
var modal; //representa el lastchild del article, corresponde al div que contiene el modal en el html.

//La función cerrarModal se activa al hacer click en la x del modal
function cerrarModal(e) {
  modal.style.display = "none"; //oculta el modal
  fondoBorroso.style.display = "none"; //quita fondo borroso
  actual.addEventListener("click", abrirModal, true); //activa el eventlistener del article que fue cerrado por abrirModal().
  actual
    .getElementsByTagName("span")[0]
    .removeEventListener("click", cerrarModal, false); //quita el listener de la x del modal.
  fondoBorroso.removeEventListener("click", cerrarModal, false); //quita listener de fondo borroso
  document.body.style.overflow = "visible"; //muestra main scrollbar
}

//abrirModal se activa al hacer click en cualquier card (article)
function abrirModal(evt) {
  actual = evt.currentTarget;
  let modalID = actual.lastElementChild.getAttribute("id");
  modal = document.getElementById(modalID);
  fondoBorroso.style.display = "block"; //pone borroso el fondo
  modal.style.display = "block"; //muestra el modal del card clickeado
  actual
    .getElementsByTagName("span")[0]
    .addEventListener("click", cerrarModal, false); //empieza a escuchar click en la x del modal.
  fondoBorroso.addEventListener("click", cerrarModal, false); //activa event listener en fondo borroso para que se cierre modal al clickear en fondo borroso.
  actual.removeEventListener("click", abrirModal, true); //quita el eventlistener del card (article) seleccionado.
  document.body.style.overflow = "hidden"; //oculta main scrollbar
}

//Activa eventListener en cada card (article)
for (let i = 0; i < document.getElementsByTagName("ARTICLE").length; i++) {
  document
    .getElementsByTagName("ARTICLE")
    [i].addEventListener("click", abrirModal, true);
}
for (let i = 0; i < document.querySelectorAll("nav > ul > li").length; i++) {
  document
    .querySelectorAll("nav > ul > li")
    [i].addEventListener("click", abrirModal, true);
}
