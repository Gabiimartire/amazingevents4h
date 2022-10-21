//Hola Gabriel, qué tal? Paso a comentarte puntos a arreglar en tu tarea.
// Agregar FavIcon. LISTO
// Los Checkbox aparecen ya checked desde que entras a la pagina. LISTO
// Funcionan los filtros por separado pero juntos no. LISTO
// Fijate de unir todos los JS. LISTO
// En las tablas, la última redondea el resultado como nosotros pasamos la foto en recursos técnicos.  LISTO
//Cuando mandas en 'Contact' el botón debería tirarte un mensajito de algo, ya sea agradeciendo o algo similar. - En Contact no tiene título la pagina LISTO.
//En Stats la primer tablita estarían mal colocados los eventos. Está en recursos técnicos también. El último sería mayor capacidad. Fijate de arreglarlo cuanto antes puedas!. LISTO
//TODO: Habia otro error que corrigiendo los otros errores me di cuenta; no entraba al details desde el home y upcomingEvents/pastEvents por como estan ubicados en las carpetas. Se corrigio con el if ternario en MostrarCards

var URI = "https://amazing-events.herokuapp.com/api/events"
let cardsContainer = document.getElementById('cards-container') 
let buscador = document.getElementById('buscador')
let contenedorCategorias = document.getElementById('contenedor-categorias')



//Tabla de del stats
let primerTabla = document.getElementById("tabla1")
let segundaTabla = document.getElementById("tabla2")
let terceraTabla = document.getElementById("tabla3")
//Tabla de del stats.//

//Variables del stats
let arrayCategoriasUpcoming = []
let arrayCategoriasPast = []
let objetoUpcoming = []
let objetoPast = []
let fechaActual;
//Variables del stats.//

let cards = []
let cardsPast = []
let arrayCategorias = []

traerDatos(URI)

function mostrarCard(evento){
    let contenedor = document.getElementById('contenedor-evento-encontrado')
    contenedor.innerHTML = ""
        let cardPadre = document.createElement('div')
        cardPadre.className = "row g-0 mt-2"
        cardPadre.innerHTML = `
        <div class="card card-details mb-1">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${evento.image} " class="img-fluid rounded-start image-details" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.date}</p>
                    <p class="card-text">${evento.place}</p>
                    <p class="card-text">${evento.description}</p>
                    <p class="card-text">$${evento.price}</p>
                    <p class="card-text"><small class="text-muted">${evento.capacity}</small></p>
                </div>
                </div>
            </div>
            </div>`
      contenedor.appendChild(cardPadre)
}
// <a href="${document.title = "Home"? `./html/details.html?id=${evento._id}` : `./details.html?id${evento._id}`} "></a>
function mostrarCards(eventos){
    cardsContainer.innerHTML = ""
    eventos.forEach(evento => {
        let cardPadre = document.createElement('div')
        cardPadre.className = "col-5 m-2 col-md-5 col-lg-3 m-lg-0 mt-lg-5 col-sm-12"
        cardPadre.innerHTML = `
        <div class="card">
        <img src="${evento.image}" class="card-img-top " alt="...">
            <div class="card-body d-flex flex-column bg-micolor4">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <a href="${document.title == "Home"? `./html/details.html?id=${evento._id}` : `details.html?id=${evento._id}`}" class="btn btn-danger" style="margin-top:auto">More Info</a>
            </div>
      </div>`
        cardsContainer.appendChild(cardPadre)
    })
}


function pintarCategorias(eventos){
    eventos.forEach(categoria=>{
        let div = document.createElement('div')
        div.className= "form-check col-lg-5 col-md-6 col-sm-3 col-3 col-12 text-white"
        div.innerHTML= `<div class="">
        <input class="form-check-input" type="checkbox" value=${categoria.split(" ")[0]} id="${categoria}">
        <label class="form-check-label" for="${categoria}">${categoria}
        </label>
        `
        contenedorCategorias.appendChild(div)
    })
}
//Pintar Tabla de Stats
function llenarDatos(mayorAsistencia, menorAsistencia, mayorCapacidad){
    let estadisticasPrimerTabla = document.createElement('tr')
    estadisticasPrimerTabla.innerHTML= `<td>${mayorAsistencia}</td>
     <td>${menorAsistencia}</td>
     <td>${mayorCapacidad}</td>`;
     primerTabla.appendChild(estadisticasPrimerTabla);

    objetoUpcoming.forEach(card => {
       let estadisticasSegundaTabla = document.createElement('tr')
       estadisticasSegundaTabla.innerHTML= `<td">${card.categoria}</td>
        <td>$${card.revenues.toLocaleString()}</td>
        <td>${card.percentage}%</td>`;
        tabla2.appendChild(estadisticasSegundaTabla);
      })
      objetoPast.forEach(card => {
        let estadisticasTercerTabla = document.createElement('tr')
        estadisticasTercerTabla.innerHTML= `<td">${card.categoria}</td>
         <td>$${card.revenues.toLocaleString()}</td>
         <td>${card.percentage}%</td>`;
         tabla3.appendChild(estadisticasTercerTabla);
       })
}

//Funciones del Stats.
function calculoMayorAsistencia(cardsPast){
    let mayorAsistencia = cardsPast.sort((a, b) => {
        return (
          (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
          (parseInt(a.assistance) * 100) / parseInt(a.capacity)
        )
    })
    return mayorAsistencia[0].name
}
function calculoMenorAsistencia(cardsPast){
    let menorAsistencia = cardsPast.sort((a, b) => {
        return (
          (parseInt(b.assistance) * 100) / parseInt(b.capacity) -
          (parseInt(a.assistance) * 100) / parseInt(a.capacity)
        )
    })
    return menorAsistencia[cardsPast.length - 1].name
}

function calculoMayorCapacidad(cards){
    let mayorCapacidad = cards.sort((a,b) => b.capacity - a.capacity)
    return mayorCapacidad[0].name   
}

function calculoCategoriasUpcoming(){
    let upcomingEvents = cards.filter(card => card.date > fechaActual)
    let ingresosUpcoming = 0
    let porcentajeUpcoming = 0
    let eventosTotales = 0
    arrayCategoriasUpcoming.map(categoria =>{
        objetoUpcoming.push({
            categoria: categoria,
            eventos: upcomingEvents.filter(card => card.category === categoria)
        })
    })
    objetoUpcoming.map(categoria =>{
        categoria.eventos.forEach(evento => ingresosUpcoming += evento.price+parseInt(evento.estimate))
        categoria.revenues = ingresosUpcoming
        ingresosUpcoming = 0

    categoria.eventos.forEach(evento => {
        porcentajeUpcoming += parseInt(evento.estimate)*100/parseInt(evento.capacity)
        eventosTotales++
    })
    categoria.percentage=(porcentajeUpcoming/eventosTotales).toFixed(2)
    porcentajeUpcoming = 0
    eventosTotales = 0
    })
}
function calculoCategoriasPast(){
    let pastEvents = cards.filter(card => card.date < fechaActual)
    let ingresosPast = 0
    let porcentajePast = 0
    let eventosTotales = 0
    arrayCategoriasPast.map(categoria =>{
        objetoPast.push({
            categoria: categoria,
            eventos: pastEvents.filter(card => card.category === categoria)
        })
    })
    objetoPast.map(categoria =>{
        categoria.eventos.forEach(evento => ingresosPast += evento.price+parseInt(evento.assistance))
        categoria.revenues = ingresosPast
        ingresosPast = 0
    categoria.eventos.forEach(evento => {
        porcentajePast += parseInt(evento.assistance)*100/parseInt(evento.capacity)
        eventosTotales++
    })
    categoria.percentage=(porcentajePast/eventosTotales).toFixed(2)
    porcentajePast = 0
    eventosTotales = 0
    })
}
// Funciones del stats


function filtrarInput(eventos){
    let palabra = buscador.value.toLowerCase()
    let eventosFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(palabra))
    return(eventosFiltrados)
}

function filtrarChecks(eventos){
    let inputCheck = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(inputCheck)
    let checkPut = arrayChecks.filter(inputCheck => inputCheck.checked)
    let arrayValues = checkPut.map(check => check.value)
    let filtro = [];
    eventos.filter(eventos => {
        arrayValues.forEach(value =>{
            if(eventos.category.includes(value)){
                return filtro.push(eventos)
            }
        })
    })
    if(filtro.length == 0){
        return eventos
    }
    return filtro
}

function filtrarAhora(){
    let eventoFiltrado1 = filtrarChecks(cards)
    let eventoFiltrado2 = filtrarInput(eventoFiltrado1)
    mostrarCards(eventoFiltrado2)
}

buscador.addEventListener("keyup", filtrarAhora)
contenedorCategorias.addEventListener('change', filtrarAhora)


function alert(){
    Swal.fire({
        icon: 'success',
        title: 'Thank You',
        text: 'Your message was sent successfully',
        footer: '<a href="../index.html" class="text-center fw-bolder">Back To Home Page</a>'
      })
    formulario.reset()
}

function traerDatos(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        cards = data.events
        fechaActual = data.currentDate
        arrayCategorias = []
        cardsPast = cards.filter(card => card.date <= data.currentDate)
        // Separando categorias
        cards.forEach(card =>{
            if(!arrayCategorias.includes(card.category)){
                arrayCategorias.push(card.category)
            }
            if(card.date > fechaActual){
                if(!arrayCategoriasUpcoming.includes(card.category)){
                    arrayCategoriasUpcoming.push(card.category)
                }
            }
            if(card.date < fechaActual){
                if(!arrayCategoriasPast.includes(card.category)){
                    arrayCategoriasPast.push(card.category)
                }
            }
        })

        if(document.title == "Home"){
            cards = data.events
        }
        else if(document.title == "Upcoming Events"){
            cards = cards.filter(card => card.date >= data.currentDate)
        }
        else if(document.title == "Past Events"){
            cards = cards.filter(card => card.date <= data.currentDate)
        }
        else if(document.title == "Stats"){
            let mayorAsistencia = calculoMayorAsistencia(cardsPast)
            let menorAsistencia = calculoMenorAsistencia(cardsPast)
            let mayorCapacidad = calculoMayorCapacidad(cards)
            calculoCategoriasPast()
            calculoCategoriasUpcoming()
            llenarDatos(mayorAsistencia, menorAsistencia, mayorCapacidad)
        }
        else if(document.title=="Details"){
            let cadenaParametrosUrl = location.search
            let parametros = new URLSearchParams(cadenaParametrosUrl)
            let id = parametros.get("id");
            console.log(id)
            let eventoEncontrado = cards.find(evento => evento._id == id);
            mostrarCard(eventoEncontrado);
        }
        mostrarCards(cards)
        pintarCategorias(arrayCategorias)
    })
}
