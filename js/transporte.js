//LOAD
$(document).ready(function() {

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
        success: function(data) {

            if (data == "") {
                $('#tableTransporte').empty(); // Limpia la tabla
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
                                        <th width="10%" class="cabecera"> Acciones </th> 
                                    </tr>
                                </thead>

                                <tbody> 
                                <tbody>

                            </table>`);


                for (var i in data) {

                    var estado = data[i].estado == 1 ? 'Disponible' : data[i].estado == 2 ? 'Inactivo' : 'Fuera de Servicio';

                    $("#tableDetalleTransporte tr:last").after(`<tr>
                                <td> <b>${data[i].id}</b> </td>
                                <td> ${data[i].tipo} </td>
                                <td> ${estado} </td>
                                <td> ${data[i].patente} </td>
                                <td>
                                <button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Modificar" onClick="mostrarModalTransporte(2,'${data[i].id}','${data[i].tipo}','${data[i].estado}','${data[i].patente}')"> <i class="fas fa-edit"></i> </button> 
                                <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar" onClick="eliminaTransporte('${data[i].id}')"> <i class="fas fa-trash-alt"></i> </button>
                                </td>
                               
                            </tr>`);
                }
            }
        },
        error: function() {
            // $('#iconPreLoad').hide();
            toastr.error('Ha ocurrido un error');
        }
    });



}

function validarFormularioTransporte() {

    if ($('#tipo').val() == '') return toastr.error('EL TIPO DE TRANSPORTE NO PUEDE SER VACIO');
    if ($('#patente').val() == '') return toastr.error('LA PLACA PATENTE NO PUEDE SER VACIO');

    agregaTransporte();
}

function agregaTransporte() {

    if ($('#tipo').val() == "" || $('#estado').val() == "" || $('#patente').val() == "") {
        toastr.error("debe ingresar datos")
        return;
    }

    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/agregaTransporte',
        type: "POST",
        dataType: "JSON",

        data: {

            'tipo': $('#tipo').val(),
            'estado': $('#estado').val(),
            'patente': $('#patente').val(),
        },
        success: function(data) {

            if (data.length == 0) {
                alertSuccess('Transporte Ingresado correctamente', true);
                $('#modalNuevoTransporte').modal('hide');

            } else {

                toastr.error('No Pudo ser Ingresado el Vehiculo')
            }

        }

    });
}

function modificaTransporte() {

    if ($('#tipo').val() == "" || $('#estado').val() == "" || $('#patente').val() == "") {
        toastr.error("debe ingresar datos")
        return;
    }

    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/modificaTransporte',
        type: "POST",
        dataType: "JSON",
        data: {
            id: $('#id').val(),
            tipo: $('#tipo').val(),
            estado: $('#estado').val(),
            patente: $('#patente').val(),
        },

        success: function(data) {
            if (data.length == 0) {
                alertSuccess('Transporte Actualizado correctamente', true);
                $('#modalNuevoTransporte').modal('hide');

            } else {
                toastr.error('No Pudo ser Ingresado el Vehiculo')
            }

        }

    });
}

function eliminaTransporte(id) {

    Swal.fire({
        // title: 'Usted está rechazando la compra del material.',
        text: '¿Está seguro que desea eliminar ?',
        //inputPlaceholder: 'El comentario es requerido',
        //input: 'textarea',
        icon: 'question',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Si, Eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74a3b',
        cancelButtonColor: '#e0dede',
        allowOutsideClick: false,

    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: 'https://bodegaeqa.promasa.cl/eliminaTransporte',
                type: 'POST',
                dataType: "JSON",
                //async: false,

                data: {
                    'id': id,
                },
                success: function(data) {
                    if (data.length == 0) {

                        alertSuccess('Eliminado Correctamente', true); // MENSAJE, TRUE RECARGA - FALSE NADA
                        listarUsuarios();
                        $('#modalNuevoUsuario').modal('hide');
                    } else {

                        //AQUI SE DESACTIVARA EL USUARIO 
                        toastr.error('Usuario no se puede eliminar');
                    }
                },
                error: function() {

                    toastr.error('Error al eliminar usuario');
                }
            });

        }

    });


}

function mostrarModalTransporte(accion, id, tipo, estado, patente) {

    $('#btnModificaTransporte').hide();
    $('#modalNuevoTransporte').modal("show");

    $('#id').val("");
    $('#tipo').val("");
    $('#estado').val("");
    $('#patente').val("");


    document.getElementById("idDiv").style.display = 'none';
    document.getElementById("divEstado").style.display = 'none';

    if (accion == 1) {

        $('#btnModificaTransporte').hide();

        $('#btnAgregaTransporte').show();

        $('#modalNuevoTransporte')[0].reset();


    }
    if (accion == 2) {

        $('#id').val(id),
            $('#tipo').val(tipo),
            $('#estado').val(estado),
            $('#patente').val(patente),

            document.getElementById("divEstado").style.display = 'block';
        document.getElementById("idDiv").style.display = 'block';
        document.getElementById("id").disabled = true;

        $('#btnModificaTransporte').show();

        $('#btnAgregaTransporte').hide();

    }
}