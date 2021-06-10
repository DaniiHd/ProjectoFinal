/*
	FUNCIONES GLOBALES
*/
$( document ).ready(function() {

  $('[data-toggle="tooltip"]').tooltip(); //Inicializa

});


//CODIFICA STRING
function codificar(str) {
   var enc = window.btoa(str);
   console.log(enc);
   return enc;   
}

//DECODIFICA STRING 
function decodificar(str) {

  return  window.atob(str);
}

//OBTIENE LA DATA DEL URL
function getDataUrl() {
  var data = [];
  var hash = [];
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  // console.log(hashes);
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    data[hash[0]] = hash[1];
  }
  return data;
}


//
function alertSuccess(title, reload){
  Swal.fire({
    icon: 'success',
    title: title,
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#4e73df',
    allowOutsideClick: false,

  }).then((result) => {

    if (result.isConfirmed){
      if(reload) location.reload();
    } 
  })
}




// function fadeLabel(etiqueta){
//   $("#div3").fadeIn(1500);
// }


//OBTIENE LA DATA DEL URL
function getDataUrl2() {
  var data = [];
  var hash = [];
  url = window.location.href

  if(!url.includes('?')) return null;

  var hashes = url.slice(url.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    data[hash[0]] = hash[1];
  }

  return data;
}