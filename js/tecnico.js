// LOAD 
$( document ).ready(function() {
    cargaTablaInstalacion();
});



// CARGA TABLA 
function cargaTablaInstalacion(){

    $(".cardDetalle").hide();        
    $('#alertNoData').hide();
    $('#iconPreLoad').fadeIn();
  
    $.ajax({
        url: 'https://predios.promasa.cl/listaInstalacion/1/0', 
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function(data){
  
          if (data == ""){
            $(".cardDetalle").hide();               
            $('#iconPreLoad').hide();
            $('#alertNoData').fadeIn();
            $('#divInstalacion').empty();
  
          }else{
            $('#alertNoData').hide(10);
            $('#iconPreLoad').hide();
            $(".cardDetalle").fadeIn();  
            $('#divInstalacion').empty();
  
            var height = (data.length > 6) ? '500px' : '100%';
            $('#divInstalacion').css('height',height);
                           
                $('#divInstalacion').append(
  
                      `<table id="tablaInstlacion" width="100%" class="table table-hover">
                      <thead>
                        <tr>
                            <th width='10%'> Id         </th> 
                            <th width='25%'> Inicio     </th> 
                            <th width='25%'> Termino    </th> 
                            <th width='15%'> Transporte </th> 
                            <th width='15%'> Estado     </th> 
                            <th width='10%'>            </th> 
                        </tr>
                      </thead>
  
                        <tbody> 
                        <tbody>
                     </table>`); 
  
                  for (var i in data) {
  
                  var estado = data[i].estado==1 ? 'Pendiente' : data[i].estado==2 ? 'En curso' : 'Completado'; 
  
                    //var inicio  = moment(data[i].fechaIngreso.date).format("DD-MM-YYYY").trim();
                    //var termino = data[i].FAprobReq == null ? '-' : moment(data[i].FAprobReq.date).format("DD-MM-YYYY").trim();
                    // [{"id":9,"estado":1,"fechaInicio":null,"fechaTermino":null,"ventaFolio":9385,"usuarioRut":null,"transporteId":null},{"id":10,"estado":1,"fechaInicio":null,"fechaTermino":null,"ventaFolio":0,"usuarioRut":null,"transporteId":null}]
                          
                    $("#tablaInstlacion tr:last").after(`<tr>
                          
                    <td> <b>${data[i].id}</b> </td>
                    <td> ${data[i].fechaInicio ?? '-'} </td>
                    <td> ${data[i].fechaTermino ?? '-'} </td>
                    <td> ${data[i].patente ?? '-'} </td>
                    <td> ${estado} </td>
  
                    <td> ${data[i].fechaInicio == null
                      ? '<button type="button" class="btn btn-primary" onClick="iniciarInstalacion('+data[i].id+',2)">Iniciar</button> '
                      : data[i].fechaTermino == null 
                        ? '<button type="button" class="btn btn-primary" onClick="iniciarInstalacion('+data[i].id+',3)">Terminar</button>'
                        : 'Completado'
                    } </td>
  
                    </tr>`);
                  }
              }
        },
        error: function() {
          $('#iconPreLoad').hide();
          toastr.error('Ha ocurrido un error');
        }
    });
}
  

function iniciarInstalacion(id, estado){
    
    var message = estado == 2 ? '¿Está seguro de iniciar la instalación?' : '¿Está seguro de terminar la instalación?'

    Swal.fire({
      // title: 'Usted está rechazando la compra del material.',
      text: message,
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: estado ==2 ? 'Si, iniciar' : 'Si, terminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#047052',
      cancelButtonColor: '#e0dede',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) iniciarInstalacionAjax(id, estado);
    });
}


function iniciarInstalacionAjax(id, estado){

    $.ajax({
        url:  'https://predios.promasa.cl/cambiarInicioTermino',
        type: 'POST',
        dataType: "JSON",
        async: false,
        data: {
          'id'     : id,
          'estado' : estado 
        },
        success: function(data){ 
            estado == 2
                ? alertSuccess('Se ha iniciado la instalación.', false)
                : alertSuccess('La instalación se ha completado.', false);

            cargaTablaInstalacion();
        },
        error: function(){   
          toastr.error('Error');
        }
    });
}

//AL COMPLETAR CAMBIAR DISPONIBILIDAD DEL VEHIULO Y EL TECNICO 