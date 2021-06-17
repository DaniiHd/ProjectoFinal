/*****************************
Desarrollador: Jean Piere
*****************************/


// LOAD 
$(document).ready(function() {

    cargaAnios();
    cargaCentroBeneficio();
    cargaMaterial();
    cargaEstado();
    cargaInformeSeguimiento();
    var dataExportExcel;
    var fileExtension = '';
    var fileSize = 0;
    var cantidadGlosa = 0;


});



// EXPORTA TO EXCEL
function exportTableToExcel() {
    $("#tableDetalleSeguimiento").table2excel({
        // exclude CSS class
        exclude: ".noExl",
        name: "Worksheet Name",
        filename: "informeSeguimiento", //do not include extension
        fileext: ".xls" // file extension
    });
}

// MUESTRA / OCULTA ALERT CON DESCRIPCION GLOSA
function showAlertDescripcion() {

    var txtNombre = $('#txtNombre').val();
    var txtDescripcion = $('#txtDescripcion').val();
    var txtMedida = $('#txtMedida').val();

    if (txtNombre == '' && txtDescripcion == '' && txtMedida == '') return $('#divAlertDescripcion').fadeOut();

    // var concat      = txtNombre.length + txtDescripcion.length + txtMedida.length;
    var descripcion = txtNombre + ' ' + txtDescripcion + ' ' + txtMedida;
    var concat = descripcion.length;

    if (txtNombre == '') concat--;
    if (txtDescripcion == '') concat--;
    if (txtMedida == '') concat--;

    $('#txtAlertDescripcion').text(descripcion.toUpperCase());
    $("#txtContadorDescripcion").empty();
    $("#txtContadorDescripcion").append(`Caracteres usados <h7><b>` + concat + `</b></h7>`);


    if (concat > 40)
        $('#alertDescripcion').removeClass('alert-success').addClass('alert-danger');
    else
        $('#alertDescripcion').removeClass('alert-danger').addClass('alert-success');

    // concat > 100 ?  $('#alertDescripcion').addClass('overflow') :  $('#alertDescripcion').removeClass('overflow');
    cantidadGlosa = concat;

    $('#divAlertDescripcion').fadeIn();
}

// CARGA ANIOS
function cargaAnios() {

    $.ajax({
        type: 'GET',
        url: '/cargaFiltros/1',
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {
            $('#divAnio').fadeIn(1500);
            $('#selectAnio').empty();
            // $('#selectAnio').append(`<option value = '0' > Todos </option>`);
            // $('#selectAnio').selectpicker('refresh');

            for (var i in data) {
                $('#selectAnio').append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $('#selectAnio').selectpicker('refresh');
            }

            var selected = document.getElementById('selectAnio');
            selected.selectedIndex = data.length - 1;
            $('#selectAnio').selectpicker('refresh');

            cargaMeses();


        }
    });
}

// CARGA MESES
function cargaMeses() {

    // var selected = document.getElementById('selectAnio');
    // if(selected.selectedIndex == 0) return;
    var anio = $('#selectAnio :selected').text();

    $.ajax({
        type: 'GET',
        url: '/cargaFiltrosMeses/2/' + anio,
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {

            $('#divSelectedMes').fadeIn(1200);
            $("#selectMeses").empty();
            $("#selectMeses").append(`<option value = '0' > Todos </option>`);
            $("#selectMeses").selectpicker('refresh');

            for (var i in data) {
                $("#selectMeses").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectMeses").selectpicker('refresh');
            }

            //TODO: QUITAR
            // var selected = document.getElementById('selectMeses');
            // selected.selectedIndex = data.length;
            // $('#selectMeses').selectpicker('refresh');

        }
    });
}

// CARGA BENEFICIO
function cargaCentroBeneficio() {
    $.ajax({
        type: 'GET',
        url: '/cargaFiltros/3',
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {

            $("#divBeneficio").fadeIn();
            $("#selectBeneficio").empty();
            $("#selectBeneficioSap").empty();
            $("#selectCentroNuevoMaterial").empty();
            $("#selectBeneficio").append(`<option value = '0' > Todos </option>`);
            $("#selectBeneficioSap").append(`<option value = '0' > Todos </option>`);
            $("#selectCentroNuevoMaterial").append(`<option value = '0' > Seleccione una opción </option>`);
            $("#selectBeneficio").selectpicker('refresh');
            $("#selectBeneficioSap").selectpicker('refresh');
            $("#selectCentroNuevoMaterial").selectpicker('refresh');

            for (var i in data) {
                $("#selectBeneficio").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectBeneficioSap").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectCentroNuevoMaterial").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectBeneficio").selectpicker('refresh');
                $("#selectBeneficioSap").selectpicker('refresh');
                $("#selectCentroNuevoMaterial").selectpicker('refresh');
            }
        }
    });
}

// CARGA MATERIAL
function cargaMaterial() {
    $.ajax({
        type: 'GET',
        url: '/cargaFiltros/4',
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {

            $("#divMaterial").fadeIn();
            $("#selectMaterial").empty();
            $("#selectMaterialSap").empty();
            $("#selectMaterial").append(`<option value = '0' > Todos </option>`);
            $("#selectMaterialSap").append(`<option value = '0' > Todos </option>`);
            $("#selectMaterial").selectpicker('refresh');
            $("#selectMaterialSap").selectpicker('refresh');

            for (var i in data) {
                $("#selectMaterial").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectMaterialSap").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectMaterial").selectpicker('refresh');
                $("#selectMaterialSap").selectpicker('refresh');
            }
        }
    });
}

// CARGA ESTADO
function cargaEstado() {
    $.ajax({
        type: 'GET',
        url: '/cargaFiltros/5',
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {

            $("#divEstado").fadeIn();
            $("#selectEstado").empty();
            $("#selectEstado").append(`<option value = '0' > Todos </option>`);
            $("#selectEstado").selectpicker('refresh');

            for (var i in data) {
                $("#selectEstado").append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $("#selectEstado").selectpicker('refresh');
            }
        }
    });
}

// RECARGA TABLA Y SELECT AL CAMBIAR DE ANIO
function selectedChangeAnio() {
    cargaMeses();
    cargaInformeSeguimiento();
}

// CARGA TABLA X ID / USUARIO AL PRESIONAR ENTER
$(document).on("keypress", ".keySearch", function(e) {
    if (e.which == 13) {
        cargaInformeSeguimiento();
    }
});

// CARGA TABLA 
function cargaInformeSeguimiento() {

    var anio = $('#selectAnio :selected').text().trim() == 'Todos' ? '0' : $('#selectAnio :selected').text();
    var mes = $('#selectMeses :selected').val();
    var beneficio = $('#selectBeneficio :selected').val();
    var material = $('#selectMaterial :selected').val();
    var estado = $('#selectEstado :selected').val();
    var id = $('#txtID').val() == '' ? '0' : $('#txtID').val();
    var usuario = $('#txtUsuario').val() == '' ? '0' : $('#txtUsuario').val();
    $(".cardDetalle").hide();
    $('#alertNoData').hide();
    $('#iconPreLoad').fadeIn();


    $.ajax({
        url: '/cargaInformeSeguimiento/0/' + anio + '/' + mes + '/' + beneficio + '/' + material + '/' + estado + '/' + id + '/' + usuario,
        type: "GET",
        dataType: "JSON",
        async: true,
        success: function(data) {

            if (data == "") {
                $(".cardDetalle").hide();
                $('#iconPreLoad').hide();
                $('#alertNoData').fadeIn();
                $('#tableInfoSeguimiento').empty();

            } else {
                $('#alertNoData').hide(10);
                $('#iconPreLoad').hide();
                $(".cardDetalle").fadeIn();
                $('#tableInfoSeguimiento').empty();

                var height = (data.length > 6) ? '500px' : '100%';
                $('#tableInfoSeguimiento').css('height', height);

                $('#tableInfoSeguimiento').append(

                    `<table id="tableDetalleSeguimiento" width="100%" class="table table-hover">
                    <thead>
                      <tr>
                      	<th> Id             </th> 
                      	<th> Material       </th> 
                      	<th> Descripcion    </th> 
                      	<th> Medidas        </th> 
                      	<th> DescripcionSAP </th> 
                      	<th> CodSAP         </th> 
                      	<th> GlosaSAP       </th> 
                      	<th> Centro         </th> 
                      	<th> Estado         </th> 
                      	<th style="white-space: pre-wrap;"> fechaIngreso   </th> 
                      	<th> UsrReq        </th> 
                      	<th style="white-space: pre-wrap;"> FAprobReq      </th> 
                      	<th> AprobReq       </th> 
                      	<th style="white-space: pre-wrap;"> FechaIdGESCOM  </th> 
                      	<th> USIdGESCOM     </th> 
                      	<th> CatReq         </th> 
                      	<th> CatGESC        </th> 
                      	<th> Activo         </th> 
                      	<th style="white-space: pre-wrap;"> FechaAct       </th> 
                      	<th> OptReq         </th> 
                      	<th> OptGESC        </th> 
                      	<th> proveedores    </th> 
                      </tr>
                    </thead>

                  	<tbody> 
                  	<tbody>
               	</table>`);


                dataExportExcel = data; //OBTIENE LA DATA DE LA TABLA PARA EXPORTARLA

                for (var i in data) {

                    var fechaIngreso = moment(data[i].fechaIngreso.date).format("DD-MM-YYYY").trim();
                    var FAprobReq = data[i].FAprobReq == null ? '-' : moment(data[i].FAprobReq.date).format("DD-MM-YYYY").trim();
                    var FechaIdGESCOM = data[i].FechaIdGESCOM == null ? '-' : moment(data[i].FechaIdGESCOM.date).format("DD-MM-YYYY").trim();
                    var FechaAct = data[i].FechaAct == null ? '-' : moment(data[i].FechaAct.date).format("DD-MM-YYYY").trim();
                    var codigoSap = data[i].CodSAP == '' ? '-' : data[i].CodSAP;
                    // <button data-id="${data[i].Id}" class="btnModificarCodSap btn btn-secondary" data-toggle="modal" data-target="#modalActualizaCodSap">${data[i].Id}</button>
                    // <td> ${data[i].DescripcionSAP == '' ? '-' : data[i].DescripcionSAP} </td>
                    /*<button class="btn btn-success" data-toggle="modal" data-target="#modalActualizaCodSap" onClick="modalActualizaCodSap('`+codigoSap+`', '`+data[i].CatReq+`', ${data[i].Centro})" >${data[i].Id}</button>*/



                    $("#tableDetalleSeguimiento tr:last").after(`<tr>
  	                  
  		            <td /*style="color:#000"*/ > <b>${data[i].Id}</b> </td>
  		            <td> ${data[i].Material == '' ? '-' : data[i].Material} </td>
  		            <td> ${data[i].Descripcion == '' ? '-' : data[i].Descripcion} </td>
  		            <td> ${data[i].Medidas == '' ? '-' : data[i].Medidas} </td>
  		            <td> ${data[i].DescripcionSAP ?? '-'} </td>
  		            <td> ${codigoSap} </td>
  		            <td> ${data[i].GlosaSAP ?? '-' } </td>
  		            <td> ${data[i].Centro ?? '-' } </td>
  		            <td> ${data[i].Estado ?? '-' } </td>
  		            <td> ${fechaIngreso} </td>
  		            <td> ${data[i].UsrReq ?? '-' } </td>
  		            <td> ${FAprobReq} </td>
  		            <td> ${data[i].AprobReq ?? '-'} </td>
  		            <td> ${FechaIdGESCOM}  </td>
  		            <td> ${data[i].USIdGESCOM ?? '-'}  </td>
  		            <td> ${data[i].CatReq ?? '-'}  </td>
  		            <td> ${data[i].CatGESC ?? '-'}  </td>
  		            <td> ${data[i].Activo ?? '-'}  </td>
  		            <td> ${FechaAct}  </td>
  		            <td> ${data[i].OptReq ?? '-'}  </td>
  		            <td> ${data[i].OptGESC ?? '-'}  </td>
  		            <td> ${data[i].proveedores ?? '-'}  </td>

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

// CARGA SELECT AL ABRIR MODAL ACTUALIZAR COD SAP
function modalActualizaCodSap(codSap, material, centro) {

    //   if (gescom1 == '' && gescom2 == '') {
    //           notificaciones('bottomLeft', 'warning', 'Material no creado en Gescom', true);
    //   }
    // }
    $('#txtCodigoSap').val(codSap);

    $('#selectMaterialSap').val(material);
    $("#selectMaterialSap").selectpicker('refresh');
    $('#selectBeneficioSap').val(centro);
    $("#selectBeneficioSap").selectpicker('refresh');

    if (codSap == '-') toastr.warning('Material no creado en Gescom');
}

// CARGA SELECT AL ABRIR MODAL NUEVO MATERIAL
function modalNuevoMaterial() {
    clearModalMaterial();
    cargaUnidadDeMedida();
    cargaPermanencia();
    $('#btnAgregaMaterial').removeClass('d-none');
}

// CARGA UNIDADES DE MEDIDA
function cargaUnidadDeMedida() {
    $.ajax({
        type: 'GET',
        url: '/cargaFiltros/6',
        dataType: "json",
        cache: false,
        // async: false,
        success: function(data) {

            $('#selectUnidadDeMedida').empty();
            $('#selectUnidadDeMedida').append(`<option value = '0' > Seleccione una opción </option>`);
            $('#selectUnidadDeMedida').selectpicker('refresh');

            for (var i in data) {
                $('#selectUnidadDeMedida').append(`<option value = '${data[i].uom}'> ${data[i].uom} </option>`);
                $('#selectUnidadDeMedida').selectpicker('refresh');
            }
        }
    });
}

// CARGA PERMANENTE / NO PERMANENTE
function cargaPermanencia() {
    $.ajax({
        type: 'GET',
        url: '/cargaFiltros/7',
        dataType: "json",
        cache: false,
        // async: false,
        success: function(data) {

            $('#selectPerNoPer').empty();
            $('#selectPerNoPer').append(`<option value = '0' > Seleccione una opción </option>`);
            $('#selectPerNoPer').selectpicker('refresh');

            for (var i in data) {
                $('#selectPerNoPer').append(`<option value = '${data[i].id}'> ${data[i].nombre} </option>`);
                $('#selectPerNoPer').selectpicker('refresh');
            }
        }
    });
}

//BUSCA EMAIL DESTINATARIO 
function buscaEmailDestinatario(planta, id) {
    var resp;
    $.ajax({
        type: 'GET',
        url: '/buscaEmailDestinatario/8/' + planta + '/' + id,
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {
            resp = data;
        }
    });
    return resp;
}

// SELECT CENTRO PLANTA
$('#selectCentroNuevoMaterial').change(function() {
    $("#selectPerNoPer")[0].selectedIndex = 0;
    $('#selectPerNoPer').selectpicker('refresh');
    $('#divAlertNotificacion').addClass('d-none');
    if (this.selectedIndex == 0) {
        $('#divSelectPerNoPer').addClass('d-none');
        $("#selectPermanencia")[0].selectedIndex = 0;
        $('#selectPermanencia').selectpicker('refresh');
    }
});

// SELECCION TIPO PERMANENCIA
$('#selectPermanencia').change(function() {

    var selected = $("#selectPermanencia")[0].selectedIndex;

    $('#divAlertNotificacion').addClass('d-none');

    $("#selectPerNoPer")[0].selectedIndex = 0;
    $('#selectPerNoPer').selectpicker('refresh');

    selected == 0 ? $('#divSelectPerNoPer').addClass('d-none') : $('#divSelectPerNoPer').removeClass('d-none');
    if (selected == 1) $('#lblPerNoPer').text('¿Cómo desea clasificar el material permante?');
    if (selected == 2) $('#lblPerNoPer').text('¿Cuál es la naturaleza de la compra única (spot)?');
    //TODO: ADD TOOLTIP LABEL
});

// SELECCION DEL ESTADO
$('#selectPerNoPer').change(function() {

    var selectedPlanta = document.getElementById('selectCentroNuevoMaterial');
    // var selectedPlanta = $('#selectPerNoPer');
    var selectedPerNoPer = document.getElementById('selectPerNoPer');
    var destinatario = '';

    if (selectedPlanta.selectedIndex == 0) {
        selectedPerNoPer.selectedIndex = 0;
        toastr.warning('Para continuar, debe seleccionar el centro');
        $('#selectPerNoPer').selectpicker('refresh');
        return;
    }

    if (selectedPerNoPer.selectedIndex == 0) {
        $('#divAlertNotificacion').addClass('d-none');
        // console.log('limpiar alert destinatario'); //TODO:
        return;
    }

    var data = buscaEmailDestinatario($('#selectCentroNuevoMaterial').val(), $('#selectPerNoPer').val());

    if (data.length == 0) return alert('Sin destinatario'); //TODO:

    for (var i in data) {
        destinatario += data[i].nombre + ' ';
    }

    $('#divAlertNotificacion').removeClass('d-none');
    $('#alertNotificacion').empty();
    $("#alertNotificacion").append(`Se enviará un correo electrónico solicitando la autorización del nuevo material y compra a <h7><b>` + destinatario.replace(',', ' y ') + `</b></h7>`);
});

// CHECK SELCCION DE ARCHIVO
$('#checkboxArchivo:checkbox').change(function() {

    if ($(this).is(':checked')) {
        $('#checkboxArchivo').val(1);
        // $('#lblArchivo').text('Guardar sin archivo');
        $('#divBtnAgregarArchivo').removeClass('d-none');
        $('#lblSizeFile').show();

    } else {
        $('#checkboxArchivo').val(0);
        // $('#lblArchivo').text('Agregar un archivo');
        // $('#choose-file-label').text('Agregar archivo');
        $('#divBtnAgregarArchivo').addClass('d-none');
        $('#lblSizeFile').hide();
    }
});


// OBTIENE EL VALOR DEL ARCHIVO INPUT
$('input[type="file"]').change(function(e) {
    var file = e.target.files[0];
    $('.custom-file-label').html(file.name);

    var sheet = document.createElement('style')



    // if(file.size > 1900000){
    if (file.size > 1900000) {
        sheet.innerHTML = ".custom-file-label::after { background-color: #dc3545; color: #fff; }";
        toastr.error('El archivo no puede superar los 1.9 MB');
    } else
        sheet.innerHTML = ".custom-file-label::after { background-color: #047052; color: #fff; }";

    fileSize = file.size;

    document.body.appendChild(sheet);
});

// BUTTON GUARDAR MATERIAL
function validaFormulario() {

    if (cantidadGlosa == 0) return toastr.error('La glosa no puede ir vacía');
    if (cantidadGlosa > 40) return toastr.error('La glosa contiene mas de 40 caracteres');
    if ($('#txtCantidad').val() == '') return toastr.error('El campo cantidad es requerido');

    if ($('#selectCentroNuevoMaterial')[0].selectedIndex == 0 ||
        $('#selectUnidadDeMedida')[0].selectedIndex == 0 ||
        $('#selectPermanencia')[0].selectedIndex == 0 ||
        $('#selectPerNoPer')[0].selectedIndex == 0)
        return toastr.error('Debe seleccionar los campos');


    if ($('#checkboxArchivo').val() == 1) {
        var fileInput = document.getElementById('file');
        if (fileInput.files.length == 0) return toastr.warning('Debe seleccionar un archivo');
        fileExtension = fileInput.files[0].name;
        fileExtension = fileExtension.split('.').pop();

    }

    if (fileSize > 1900000)
        return toastr.error('El archivo no puede superar los 1.9 MB');

    if ($('#checkboxArchivo').val() == 0) fileExtension = '';

    agregaMaterial();
}

// GUARDA MATERIAL
function agregaMaterial() {

    // alert(fileExtension);

    $.ajax({
        url: '/agregaMaterial',
        type: 'POST',
        dataType: "JSON",
        async: false,
        data: {
            'accion': 101,
            'planta': $('#selectCentroNuevoMaterial').val(), //centro 
            'clase': $('#selectPerNoPer').val(), //critico //sino AN
            'usr': $('#lblUsuario').val(), //usuario 
            'codSAP': '', //''
            'descSAP': '', //''
            'codProd': $('#txtNombre').val(), //NOMBRE
            'descProducto': $('#txtDescripcion').val(), //DESCRIPCION
            'uomProducto': $('#selectUnidadDeMedida').val(), //Unidad medida 
            'medidasProducto': $('#txtMedida').val(), //medida 
            'codFabrica': $('#txtCodFabricaMat').val(), //cod fabrica material
            'descripcioncompra': $('#txtDescripcionFabrica').val(), //des fabrica
            'linkContacto': $('#txtLinkContacto').val(), //link
            'permanenciaGescomp': $('#selectPermanencia').val(), //SI o NO
            'cantidadGescomp': $('#txtCantidad').val(), //Cantidad
            'tiempoentregagescomp': 0, //0
            'tipoCompra': 'Requeri', //Requeri
            // 'plano'                : $('#checkboxArchivo').val() //1 si - 0 No //////
            'plano': fileExtension //1 si - 0 No //////
                // 'dataFile'             : dataFile  //1 si - 0 No //////
        },
        success: function(data) {

            if ($('#checkboxArchivo').val() == 1) guardarPlano(data[0].respuesta);
            alertSuccess('Solicitud de material ingresada correctamente', false);
            $('#modalNuevoMaterial').modal('hide');
        },
        error: function() {
            toastr.error('Error al ingresar el nuevo material');
        }
    });
}

// GUARDA FILE PLANO
function guardarPlano(codigoMaterial) {

    var fileInput = document.getElementById('file');
    var oFile = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', oFile);
    formData.append('codigoMaterial', codigoMaterial);
    // alert(formData);

    $.ajax({
        url: '/guardarPlano',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {}
    });
}

// LIMPIA EL MODAL NUEVO MATERIAL
function clearModalMaterial() {

    var sheet = document.createElement('style')
    sheet.innerHTML = ".custom-file-label::after { background-color: #eaecf4; color: #6e707e; }";
    document.body.appendChild(sheet);

    cantidadGlosa = 0;
    $('#txtNombre').val('');
    $('#txtDescripcion').val('');
    $('#txtMedida').val('');
    $('#txtCodFabricaMat').val('');
    $('#txtDescripcionFabrica').val('');
    $('#txtLinkContacto').val('');
    $('#txtContadorDescripcion').val('');
    $('#txtCantidad').val('');
    $('#selectCentroNuevoMaterial')[0].selectedIndex = 0;
    $('#selectCentroNuevoMaterial').selectpicker('refresh');

    $('#selectUnidadDeMedida').val(0);
    $('#selectPermanencia')[0].selectedIndex = 0;
    $('#selectPermanencia').selectpicker('refresh');

    $('#selectPerNoPer').val(0);
    $('.custom-file-label').html('');
    $('#divAlertDescripcion').hide();
    $('#divAlertNotificacion').addClass('d-none');

    $('#divSelectPerNoPer').addClass('d-none');
    $('#divBtnAgregarArchivo').removeClass('d-none');
    $('#checkboxArchivo').prop('checked', true);
}