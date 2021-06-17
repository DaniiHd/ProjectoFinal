//LOAD
$(document).ready(function () {

    listarTransporte();
    // $('#llamarID').val();
    // $('#llamarID').val('Le pasas un valor');

});


function listarTransporte() {

    $(".cardDetalle").hide();
    $('#alertNoData').hide();
    // $('#iconPreLoad').fadeIn();
    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/listaTransportes/0',
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function (data) {

            if (data == "") {
                $('#tableTransporte').empty();  // Limpia la tabla
                $(".cardDetalle").hide(); // Oculta el Card
                // $('#iconPreLoad').hide(); // Oculta el icono
                $('#alertNoData').fadeIn(); // Muestra alerta 'sin datos'

            } else {

                $('#alertNoData').hide(10); // Oculta alerta 
                // $('#iconPreLoad').hide(); // Oculta el icono
                $(".cardDetalle").fadeIn(); // Muestra el Card
                $('#tableTransporte').empty(); // Limpia la tabla 

                var height = (data.length > 6) ? '500px' : '100%';

                $('#tableTransporte').css('height', height);

                $('#tableTransporte').append( //Agregar las cabeceras a la tabla 

                    `<table id="tableDetalleTransporte" width="100%" class="table table-hover">
                                <thead>
                                    <tr>
                                        <th width="20%" class="cabecera"> Id       </th> 
                                        <th width="20%" class="cabecera"> Tipo </th> 
                                        <th width="20%" class="cabecera"> Estado </th> 
                                        <th width="20%" class="cabecera"> Patente </th> 
                                        <th width="10%" class="cabecera"> Modificar </th> 
                                        <th width="10%" class="cabecera"> Eliminar </th> 
                                    </tr>
                                </thead>

                                <tbody> 
                                <tbody>

                            </table>`);


                for (var i in data) {
                    $("#tableDetalleTransporte tr:last").after(`<tr>
                                <td> <b>${data[i].id}</b> </td>
                                <td> ${data[i].tipo} </td>
                                <td> ${data[i].estado} </td>
                                <td> ${data[i].patente} </td>
                                <td> <button type="button" class="btn btn-primary" onClick="mostrarModalTransporte('${data[i].id}', '${data[i].tipo}','${data[i].estado}','${data[i].patente}' )" > Modificar </button> </td>
                                <td> <button type="button" class="btn btn-danger"> eliminar </button> </td>
                            </tr>`);
                }
            }
        },
        error: function () {
            // $('#iconPreLoad').hide();
            toastr.error('Ha ocurrido un error');
        }
    });

    

}


function validarFormularioTransporte(){

    if ($('#tipo').val() == '') return toastr.error('EL TIPO DE TRANSPORTE NO PUEDE SER VACIO');
    if ($('#patente').val() == '') return toastr.error('LA PLACA PATENTE NO PUEDE SER VACIO');
    
    agregaTransporte();
}


function agregaTransporte(){
    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/agregaTransporte',
        type: "POST",
        dataType: "JSON",

        data:{

        'tipo':$('#tipo').val(),
        'estado':$('#estado').val(),
        'patente':$('#patente').val(),
        },
        success: function(data){

            if (data.length == 0){
                alertSuccess('Transporte Ingresado correctamente', false);
                $('#modalNuevoTransporte').modal('hide');

            }else{

                toastr.error('No Pudo ser Ingresado el Vehiculo')
            }

        }

    });
}

function modificaTransporte(){


    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/agregaTransporte',
        type: "POST",
        dataType: "JSON",

        data:{

        'tipo':$('#tipo').val(),
        'estado':$('#estado').val(),
        'patente':$('#patente').val(),
        },
        success: function(data){

            if (data.length == 0){
                alertSuccess('Transporte Ingresado correctamente', false);
                $('#modalNuevoMaterial').modal('hide');

            }else{

                toastr.error('No Pudo ser Ingresado el Vehiculo')
            }

        }

    });
}


function eliminaTransporte(){





}


function mostrarModalTransporte(accion, id, tipo, estado, patente) {

    $('#btnModificaUsuario').hide();
    $('#modalNuevoTransporte').modal("show");

    $('#id').val("");
    $('#tipo').val("");
    $('#estado').val("");
    $('#patente').val("");
   
    document.getElementById("rut").disabled = false;
    if (accion == 1) {

        $('#btnModificaTransporte').hide();

        $('#btnAgregaTransporte').show();

        $('#modalNuevoTransporte')[0].reset();


    }
    if (accion == 2) {

        $('#rut').val(rut),
            $('#nombre').val(nombre),
            $('#paterno').val(paterno),
            $('#materno').val(materno),
            $('#correo').val(correo),
            $('#telefono').val(telefono),
            $('#direccion').val(direccion),
            $('#cargo').val(cargo),

            

        document.getElementById("rut").disabled = true;

        $('#btnModificaUsuario').show();

        $('#btnAgregaUsuario').hide();

        $('#divClave').hide();

    }
}