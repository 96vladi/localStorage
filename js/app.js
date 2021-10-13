//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event listeners
eventListeners();

function eventListeners(){
  //CUando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweets);
  // Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
    //console.log(tweets);
    //Crea el html con lo anterior del localStorage
    crearHTML();
  });
}


//Funciones

function agregarTweets(e){
  e.preventDefault();
  //console.log("Agregando...");
  //Text area donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;
  //console.log(tweet);
  if (tweet === '') {
    mostrarError('Un msj no puede ir vacio');
    return; //Evita que se ejecuten mas codigos abajo
  }

  const tweetObj = {
    id: Date.now(),
    // texto : tweet
    // tweet : tweet
    tweet
  }
  //Añadir al arreglo de tweers
  tweets = [...tweets, tweetObj];
  //console.log(tweets);
  // Una vez creado creamos el html
  crearHTML();

  // Reiniciar el formulario
  // Primer forma
  //document.querySelector('#tweet').value = "";
  // Segunda forma
  formulario.reset();
}

//Mostrar msj de error

function mostrarError(error){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');
  // Insertando en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);
  //Elimina la alerta despues de 3 seg.
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra un listado de los tweets
function crearHTML(){
  limpiarHtml()
  if (tweets.length > 0) {
    tweets.forEach( tweet => {
      //Agregar un boton eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'x';
      // Crear el thml
      const li = document.createElement('li');
      //Añadir el texto
      li.innerText = tweet.tweet;
      //Asignar el boton
      li.appendChild(btnEliminar);
      //Añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }
      // otra forma li.textContent = tweet.tweet;
      //Insertando en el listado html
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

// Agrega los tweets al storage
function sincronizarStorage(){
    localStorage.setItem("tweets",JSON.stringify(tweets));
}

//Elimina el tweet
function borrarTweet(id){
  //console.log("Borrando", id);
  tweets = tweets.filter( tweet => tweet.id !== id );
  crearHTML();
}


//Limpiar el html
function limpiarHtml(){
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
