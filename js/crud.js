//LOAD
$(document).ready(function() {

    llenaCargos();
    // $('#llamarID').val();
    // $('#llamarID').val('Le pasas un valor');

});



function llenaCargos() {

    $(".cardDetalle").hide();
    $('#alertNoData').hide();
    // $('#iconPreLoad').fadeIn();
    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/listaCargos',
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function(data) {

            if (data == "") {
                $('#tableInfoSeguimiento').empty(); // Limpia la tabla
                $(".cardDetalle").hide(); // Oculta el Card
                // $('#iconPreLoad').hide(); // Oculta el icono
                $('#alertNoData').fadeIn(); // Muestra alerta 'sin datos'

            } else {

                $('#alertNoData').hide(10); // Oculta alerta 
                // $('#iconPreLoad').hide(); // Oculta el icono
                $(".cardDetalle").fadeIn(); // Muestra el Card
                $('#tableInfoSeguimiento').empty(); // Limpia la tabla 

                var height = (data.length > 6) ? '500px' : '100%';

                $('#tableInfoSeguimiento').css('height', height);

                $('#tableInfoSeguimiento').append( //Agregar las cabeceras a la tabla 

                    `<table id="tableDetalleSeguimiento" width="100%" class="table table-hover">
                                <thead>
                                    <tr>
                                        <th width="20%" class="cabecera"> Id       </th> 
                                        <th width="70%" class="cabecera"> Material </th> 
                                        <th width="10%" class="cabecera">    BUTON </th> 
                                    </tr>
                                </thead>

                                <tbody> 
                                <tbody>

                            </table>`);


                for (var i in data) {
                    $("#tableDetalleSeguimiento tr:last").after(`<tr>
                                <td> <b>${data[i].id}</b> </td>
                                <td> ${data[i].nombre} </td>
                                <td> <button type="button" class="btn btn-danger" onClick="accionBoton()"> Danger </button> </td>
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

function accionBoton() {

    // $('#modalNuevoMaterial').modal('show');

    Swal.fire({
        // title: 'Usted está rechazando la compra del material.',
        text: '¿Está seguro de rechazar la solicitud?',
        inputPlaceholder: 'El comentario es requerido',
        input: 'textarea',
        icon: 'question',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Si, rechazar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#e74a3b',
        cancelButtonColor: '#e0dede',
        allowOutsideClick: false,

    }).then((result) => {

        if (result.isConfirmed) {

            // METODO A EJECUTAR ELIMINAR MODIFICAR 

            // ESTE CUANDO LA DATA ES OK DEL AJAX CUANDO DA EN ACEPTRAR
            alertSuccess('Solicitud rechazada', false); // MENSAJE, TRUE RECARGA - FALSE NADA
        }

    });


}