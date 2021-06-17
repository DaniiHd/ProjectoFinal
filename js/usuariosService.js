//LOAD
$(document).ready(function() {

    listarUsuarios();
    llenaCargos();
    $('[data-toggle="tooltip"]').tooltip();


    // $('#llamarID').val();
    // $('#llamarID').val('Le pasas un valor');
});


//VALIDADOR DE RUT
function checkRut(rut) {

    // Despejar Puntos
    var valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0, -1);
    dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + '-' + dv

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
        toastr.warning("RUT Incompleto");
        return false;
    }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {

        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;

        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }

    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
        toastr.error("RUT Inválido");
        return false;
    }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

//VALIDADOR DE CORREO
function validarEmail(email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)) {
        toastr.warning("La dirección de correo es incorrecta.");
    } else {
        toastr.success("La dirección de correo es correcta.");
    }
    console.log(email);
}

function validarTelefono(telefono) {
    expr = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
    if (!expr.test(telefono)) {
        toastr.warning("el telefono es incorrecto.");
    } else {
        toastr.success("el telefono es correcto.");
    }

}
//LISTAR USUARIOS

function listarUsuarios() {

    $(".cardDetalle").hide();
    $('#alertNoData').hide();
    // $('#iconPreLoad').fadeIn();
    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/listaUsuarios/1',
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function(data) {

            if (data == "") {
                $('#tableUsuarios').empty(); // Limpia la tabla
                $(".cardDetalle").hide(); // Oculta el Card
                // $('#iconPreLoad').hide(); // Oculta el icono
                $('#alertNoData').fadeIn(); // Muestra alerta 'sin datos'

            } else {

                $('#alertNoData').hide(10); // Oculta alerta 
                // $('#iconPreLoad').hide(); // Oculta el icono
                $(".cardDetalle").fadeIn(); // Muestra el Card
                $('#tableUsuarios').empty(); // Limpia la tabla 

                var height = (data.length > 6) ? '500px' : '100%';

                $('#tableUsuarios').css('height', height);

                $('#tableUsuarios').append( //Agregar las cabeceras a la tabla 

                    `<table id="tableUsuarios" width="100%" class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="cabecera"> Rut </th> 
                                        <th class="cabecera"> Nombre </th> 
                                        <th class="cabecera"> Paterno </th> 
                                        <th class="cabecera"> materno </th>
                                        <th class="cabecera"> Correo </th>
                                        <th class="cabecera"> Telefono </th>
                                        <th class="cabecera"> Dirección </th>
                                        <th class="cabecera"> Cargo </th>
                                        <th class="cabecera"> usuario </th>
                                        <th class="cabecera"> Acciones </th>                                       
                                    </tr>
                                </thead>

                                <tbody> 
                                <tbody>

                            </table>`);


                for (var i in data) {

                    var nombreCargo = data[i].cargoId == 1 ? 'Administrador' : 'Técnico';

                    var d = JSON.stringify(data);

                    $("#tableUsuarios tr:last").after(`<tr>
                                <td> <b>${data[i].rut}</b> </td>
                                <td> ${data[i].nombre} </td>
                                <td> ${data[i].paterno} </td>
                                <td> ${data[i].materno} </td>
                                <td> ${data[i].correo} </td>
                                <td> ${data[i].telefono} </td>
                                <td> ${data[i].direccion} </td> 
                                <td> ${nombreCargo} </td>
                                <td> ${data[i].usuario} </td>
                                <td> 
                                <button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Modificar" onClick="mostrarModalUsuario(2,'${data[i].rut}','${data[i].nombre}','${data[i].paterno}','${data[i].materno}','${data[i].correo}','${data[i].telefono}','${data[i].direccion}','${data[i].cargoId}','${data[i].estado}')"> <i class="fas fa-edit"></i> </button> 
                                <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar" onClick="eliminaUsuario('${data[i].rut}')"> <i class="fas fa-trash-alt"></i> </button>
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

function listarUsuarioInactivos() {

    $(".cardInactivos").hide();
    $('#alertNoData').hide();
    // $('#iconPreLoad').fadeIn();
    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/listaUsuarios/2',
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function(data) {

            if (data == "") {
                $('#tableInactivos').empty(); // Limpia la tabla
                $(".cardInactivos").hide(); // Oculta el Card
                // $('#iconPreLoad').hide(); // Oculta el icono
                $('#alertNoData').fadeIn(); // Muestra alerta 'sin datos'

            } else {

                $('#alertNoData').hide(10); // Oculta alerta 
                // $('#iconPreLoad').hide(); // Oculta el icono
                $(".cardInactivos").fadeIn(); // Muestra el Card
                $('#tableInactivos').empty(); // Limpia la tabla 

                var height = (data.length > 6) ? '500px' : '100%';

                $('#tableUsuarios').css('height', height);

                $('#tableUsuarios').append( //Agregar las cabeceras a la tabla 

                    `<table id="tableUsuarios" width="100%" class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="cabecera"> Rut </th> 
                                        <th class="cabecera"> Nombre </th> 
                                        <th class="cabecera"> Paterno </th> 
                                        <th class="cabecera"> materno </th>
                                        <th class="cabecera"> Correo </th>
                                        <th class="cabecera"> Telefono </th>
                                        <th class="cabecera"> Dirección </th>
                                        <th class="cabecera"> Cargo </th>
                                        <th class="cabecera"> usuario </th>
                                        <th class="cabecera"> Acciones </th>                                       
                                    </tr>
                                </thead>

                                <tbody> 
                                <tbody>

                            </table>`);


                for (var i in data) {

                    var nombreCargo = data[i].cargoId == 1 ? 'Administrador' : 'Técnico';

                    var d = JSON.stringify(data);

                    $("#tableUsuarios tr:last").after(`<tr>
                                <td> <b>${data[i].rut}</b> </td>
                                <td> ${data[i].nombre} </td>
                                <td> ${data[i].paterno} </td>
                                <td> ${data[i].materno} </td>
                                <td> ${data[i].correo} </td>
                                <td> ${data[i].telefono} </td>
                                <td> ${data[i].direccion} </td> 
                                <td> ${nombreCargo} </td>
                                <td> ${data[i].usuario} </td>
                                <td> <button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="Modificar" onClick="mostrarModalUsuario(2,'${data[i].rut}','${data[i].nombre}','${data[i].paterno}','${data[i].materno}','${data[i].correo}','${data[i].telefono}','${data[i].direccion}','${data[i].cargoId}','${data[i].estado}')"> <i class="fas fa-edit"></i> </button> 
                                <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Eliminar" onClick="eliminaUsuario('${data[i].rut}')"> <i class="fas fa-trash-alt"></i> </button>
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

//LLENA CARGOS EN SELECT
function llenaCargos() {
    $.ajax({
        type: 'GET',
        url: 'https://bodegaeqa.promasa.cl/listaCargos',
        dataType: "json",
        //cache: false,
        //async: false,
        success: function(data) {

            //$("#divEstado").fadeIn();
            $("#cargo").empty();
            $("#cargo").selectpicker('refresh');

            for (var i in data) {
                $("#cargo").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#cargo").selectpicker('refresh');
            }
        }
    });
}

//AGREGA USUARIOS
function agregaUsuario() {

    // alert(fileExtension);
    const correo = $('#correo').val();
    var user = correo.split('@')

    if ($('#rut').val() == "" || $('#nombre').val() == "" || $('#paterno').val() == "" || $('#materno').val() == "" || $('#correo').val() == "" || $('#telefono').val() == "" || $('#direccion').val() == "" || $('#cargo').val() == "" || $('#clave').val() == "") {
        toastr.error("debe ingresar datos")
        return;
    }

    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/agregaUsuario',
        type: 'POST',
        dataType: "JSON",
        //async: false,

        data: {
            'rut': $('#rut').val(),
            'nombre': $('#nombre').val(),
            'paterno': $('#paterno').val(),
            'materno': $('#materno').val(),
            'correo': $('#correo').val(),
            'telefono': $('#telefono').val(),
            'direccion': $('#direccion').val(),
            'idCargo': $('#cargo').val(),
            'clave': $('#clave').val(),
            'usuario': user[0]
        },
        success: function(data) {
            if (data.length == 0) {
                alertSuccess('Usuario Ingresado Correctamente', true);
                $('#modalNuevoUsuario').modal('hide');
            } else {
                toastr.error('Usuario ya existe');
            }
        },
        error: function() {

            toastr.error('Error al ingresar usuario ');
        }
    });
}

function modificaUsuario() {

    // alert(fileExtension);
    const correo = $('#correo').val();
    var user = correo.split('@')

    if ($('#nombre').val() == "" || $('#paterno').val() == "" || $('#materno').val() == "" || $('#correo').val() == "" || $('#telefono').val() == "" || $('#direccion').val() == "" || $('#cargo').val() == "") {
        toastr.error("debe ingresar datos")
        return;
    }

    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/modificaUsuarioSma',
        type: 'POST',
        dataType: "JSON",
        //async: false,

        data: {
            rut: $("#rut").val(),
            nombre: $("#nombre").val(),
            paterno: $("#paterno").val(),
            materno: $("#materno").val(),
            telefono: $("#telefono").val(),
            direccion: $("#direccion").val(),
            correo: $("#correo").val(),
            idCargo: $("#cargo").val(),
            usuario: user[0]
        },
        success: function(data) {
            if (data.length == 0) {
                alertSuccess('Usuario Modificado Correctamente', true);
                $('#modalNuevoUsuario').modal('hide');
            } else {
                toastr.error('Usuario ya existe');
            }
        },
        error: function() {
            toastr.error('Error al modificar usuario ');
        }
    });
}

//MODIFICA USUARIOS
function mostrarModalUsuario(accion, rut, nombre, paterno, materno, correo, telefono, direccion, cargo) {


    $('#btnModificaUsuario').hide();
    $('#modalNuevoUsuario').modal("show");

    $('#rut').val("");
    $('#nombre').val("");
    $('#paterno').val("");
    $('#materno').val("");
    $('#correo').val("");
    $('#telefono').val("");
    $('#direccion').val("");
    $('#cargo').val("");

    document.getElementById("rut").disabled = false;
    if (accion == 1) {

        $('#btnModificaUsuario').hide();

        $('#btnModificaClave').hide();

        $('#btnAgregaUsuario').show();

        $('#modalNuevoUsuario')[0].reset();


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

            $('#cargo').selectpicker('refresh');

        $('#btnModificaClave').show();

        document.getElementById("rut").disabled = true;

        $('#btnModificaUsuario').show();

        $('#btnAgregaUsuario').hide();

        $('#divClave').hide();

    }
}

function ModalInactivos() {

    $('#modalInactivos').modal("show");

    $(".cardInactivos").hide();
    $('#alertNoData').hide();
    // $('#iconPreLoad').fadeIn();
    $.ajax({
        url: 'https://bodegaeqa.promasa.cl/listaUsuarios/2',
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function(data) {

            if (data == "") {
                $('#tableInactivos').empty(); // Limpia la tabla
                $(".cardInactivos").hide(); // Oculta el Card
                // $('#iconPreLoad').hide(); // Oculta el icono
                $('#alertNoData').fadeIn(); // Muestra alerta 'sin datos'

            } else {

                $('#alertNoData').hide(10); // Oculta alerta 
                // $('#iconPreLoad').hide(); // Oculta el icono
                $(".cardInactivos").fadeIn(); // Muestra el Card
                $('#tableInactivos').empty(); // Limpia la tabla 

                var height = (data.length > 6) ? '500px' : '100%';

                $('#tableInactivos').css('height', height);

                $('#tableInactivos').append( //Agregar las cabeceras a la tabla 

                    `<table id="tableInactivos" width="100%" class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="cabecera"> Rut </th> 
                                        <th class="cabecera"> Nombre </th> 
                                        <th class="cabecera"> Paterno </th> 
                                        <th class="cabecera"> materno </th>
                                        <th class="cabecera"> Correo </th>
                                        <th class="cabecera"> Telefono </th>
                                        <th class="cabecera"> Dirección </th>
                                        <th class="cabecera"> Cargo </th>
                                        <th class="cabecera"> usuario </th>
                                        <th class="cabecera"> Acciones </th>                                       
                                    </tr>
                                </thead>

                                <tbody> 
                                <tbody>

                            </table>`);


                for (var i in data) {

                    var nombreCargo = data[i].cargoId == 1 ? 'Administrador' : 'Técnico';

                    var d = JSON.stringify(data);

                    $("#tableInactivos tr:last").after(`<tr>
                                <td> <b>${data[i].rut}</b> </td>
                                <td> ${data[i].nombre} </td>
                                <td> ${data[i].paterno} </td>
                                <td> ${data[i].materno} </td>
                                <td> ${data[i].correo} </td>
                                <td> ${data[i].telefono} </td>
                                <td> ${data[i].direccion} </td> 
                                <td> ${nombreCargo} </td>
                                <td> ${data[i].usuario} </td>
                                <td> 
                                <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitch1">
                            <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
                            </div>
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

function modalClave() {

    $('#modalNuevoUsuario').modal("hide");
    $('#modalModificarClave').modal("show");

}
//ELIMINA USUARIOS

function eliminaUsuario(rut) {

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
                url: 'https://bodegaeqa.promasa.cl/eliminaUsuario',
                type: 'POST',
                dataType: "JSON",
                //async: false,

                data: {
                    'rut': rut,
                },
                success: function(data) {
                    if (data.length == 0) {

                        alertSuccess('Eliminado Correctamente', false); // MENSAJE, TRUE RECARGA - FALSE NADA
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

function validarContraseña() {
    const clave1 = $('#nuevaClave').val();
    const clave2 = $('#nuevaClaveRepite').val();
    if (clave1 != '' && clave2 != '') {
        if (clave1 != clave2) {
            //si las contraseñas no coinciden
            toastr.error('las contraseñas no cinciden')
                //__('resultado').innerHTML = '<p class="error"><strong>Error: </strong>¡Las contraseñas no coinciden!</p>';
        } else {
            //Si todo esta correcto 
            $.ajax({
                url: 'https://bodegaeqa.promasa.cl/actualizaClave',
                type: 'POST',
                dataType: "JSON",
                //async: false,

                data: {
                    rut: $("#rut").val(),
                    clave: $("#nuevaClave").val(),
                },
                success: function(data) {
                    if (data.length == 0) {

                        console.log(data);

                        alertSuccess('Clave Modificada Correctamente', true);
                        $('#modalModificarClave').modal('hide');
                    } else {
                        toastr.error('Usuario ya existe');
                    }
                },
                error: function() {
                    toastr.error('Error al modificar usuario ');
                }
            });

        }
    } else {
        //si los campos o uno, este vacio
        // __('resultado').innerHTML = '<p class="error"><strong>Error: </strong>¡Los campos no deben estar vacios!</p>';
        toastr.error('No puede tener campos vacios');
    }
}