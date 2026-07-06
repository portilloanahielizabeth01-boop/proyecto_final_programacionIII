/**
 * Page User List
 */

'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_user_table = $('.tablaAsistencia'),
   
    userView = 'app-user-view-account.html',
    statusObj = {
      1: { title: 'Pending', class: 'bg-label-warning' },
      2: { title: 'Active', class: 'bg-label-success' },
      3: { title: 'Inactive', class: 'bg-label-secondary' }
    };

  

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
     ajax: {
        "method":"POST",
        "url": "../../funcionalidadesphp/GUIA/listadeTurnosEquipos.php"
      },
      columns: [
        { data: "fechaInicio" },
       // { data: "tipoAsesor" },
        { data: "usuariosNombre" },
        { data: "usuariosDni" },
        { data: "gdeDetalles" },
        { data: "empleado" },
        { data: "TipoTramite" },
        { data: "Estado" },
        { data: "contactado" },
        { data: "asesorado" },
        { data: "Accion" }
         ],
      
      columnDefs: [
        
        {
          // User Role
          targets: 0,
          render: function (data, type, full, meta) {
           // Supongamos que $fecha_de_inicio es una cadena que contiene la fecha en formato 'YYYY-MM-DD HH:mm:ss'
            var fechaHora = full['guiaTurnos_fecha_de_inicio'];
            var fechaSinHora = fechaHora.split(' ')[0]; // Obtener solo la parte de la fecha
            
            if (fechaSinHora != "") {
              return '<span class="fw-semibold">' + fechaSinHora + '</span>';
            } else {
              return '<span class="fw-semibold"> - </span>';
            }

            
          }
        },
        {
          // User Role
          targets: 1,
          render: function (data, type, full, meta) {
           
            var $usuarios_nombre=  full['guia_codigo'];
           var  $usuarios_apellido=  full['guia_dnicliente'];
   //  var $fecha_de_inicio = full['guia_detalles'];
            if($usuarios_apellido != ""){
              return '<span class="fw-semibold">' + $usuarios_apellido + '</span>';
            }else{
              return '<span class="fw-semibold"> - </span>';
            }

            
          }
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $usuarios_dni = full['guia_nro_telefono'];

            if($usuarios_dni != ""){
              return '<span class="fw-semibold">' + $usuarios_dni + '</span>';
            }else{
              return '<span class="fw-semibold"> - </span>';
            }

            
          }
        },
        {
          // User Role
          targets: 3,
          render: function (data, type, full, meta) {
            var $gde_detalles= full['guia_detalles'];

            if($gde_detalles != ""){
              return '<span class="fw-semibold">' + $gde_detalles + '</span>';
            }else{
              return '<span class="fw-semibold"> - </span>';
            }

            
          }
        }
        ,
           {
          // User Role
          targets: 4,
          render: function (data, type, full, meta) {
              var nombre=  full['usuario_nombre'];
           var  apellido=  full['usuario_apellido'];

              if(nombre != "" && apellido != ""){
             return '<span class="fw-semibold">' + nombre + '   ' +     apellido + '</span>';
            }else{
              return '<span class="fw-semibold"> - </span>';
            }

            
          }
        },
        {
          // User Role
          targets: 5,
          render: function (data, type, full, meta) {
            var $FechaCierre= full['guiaTurnos_fecha_de_cierre'];
            var  $cantidad_dias = full['guia_detalles'];
            
            
        

            if($FechaCierre != ""){
            if($FechaCierre=="pendiente"){
              return '<span class="fw-semibold">' + $FechaCierre + '</span>';
            }else{
              return '<span class="fw-semibold">' + $FechaCierre + '</span>';
            }
          }else{
            return '<span class="fw-semibold"> - </span>';
          }
            
          }
        },
        {
          // User Role
          targets: 6,
          render: function (data, type, full, meta) {
            var $tipoTurnoDescripcion = full['guia_tipoTurnoDescripcion'];
       var $tipoAsesoramiento = full['Rela_tipo_asesor'];
           var $TipoTurnoM = full['RelaTipoTurno'];

            
          
              if($tipoTurnoDescripcion != ""){
 if($TipoTurnoM=="4"){
                    if ($tipoAsesoramiento == 1) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Curriculum' + '</span>';
}else if ($tipoAsesoramiento == 2) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Perfil Laboral' + '</span>';
}else if ($tipoAsesoramiento == 3) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Plan de Accion laboral' + '</span>';
}else if ($tipoAsesoramiento == 4) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Asesoramiento' + '</span>';
}else if ($tipoAsesoramiento == 5) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Derivaciones' + '</span>';
}else if ($tipoAsesoramiento == 8) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Diagnostico Inicial' + '</span>';
}else if ($tipoAsesoramiento == 10) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Marketing' + '</span>';
}else if ($tipoAsesoramiento == 11) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Contable' + '</span>';
}else if ($tipoAsesoramiento == 12) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Legal' + '</span>';
}else if ($tipoAsesoramiento == 13) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Negocios' + '</span>';
}else if ($tipoAsesoramiento == 14) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' C.V.' + '</span>';
}else if ($tipoAsesoramiento == 15) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Plan de Accion' + '</span>';
}else if ($tipoAsesoramiento == 16) {
    return '<span class="fw-semibold">' + $tipoTurnoDescripcion  + ' Disminuciones' + '</span>';
} else {
    console.log('Tipo de asesoramiento no definido');
} 
               //   return '<span class="fw-semibold">' + $tipoTurnoDescripcion + $tipoAsesoramiento + '</span>';
              
 
                  }else {
              return '<span class="fw-semibold">' + $tipoTurnoDescripcion + '</span>';
                  }
                  }else{
              return '<span class="fw-semibold"> - </span>';
            }
          
          
            
          }
        },
       
       
           {
          // User Role
          targets: 7,
          render: function (data, type, full, meta) {
              
              
              

              
      let $Documentacion1= full['Documentacion_opc'];
            let  $Documentacion2 = full['Documentacion_opc2'];

let rutaDocumentacion1 = "../../funcionalidadesphp/GUIA/" + $Documentacion1;
let rutaDocumentacion2 = "../../funcionalidadesphp/GUIA/" + $Documentacion2;

  // Construir los botones de descarga dependiendo de la disponibilidad de las documentaciones
let downloadButtons = '';

if ($Documentacion1) {
    downloadButtons += `
        <span class="badge bg-label-primary me-0">
            <a href="${rutaDocumentacion1}" download>
                <i class="bx bxs-download"></i> 
            </a>
       </span>
    `;
}

if ($Documentacion2 && $Documentacion2.split('Documentacion2/').pop().trim()) {
    downloadButtons += `
        <span class="badge bg-label-primary me-0">
            <a href="${rutaDocumentacion2}" download>
                <i class="bx bxs-download"></i> 
            </a>
        </span>
    `;
}

if (!$Documentacion1  && !$Documentacion2) {
     downloadButtons += `
       <span class="badge bg-label-primary me-1">
        <i class="bx bx-x"></i>
    </span>
    `;
}

// Devolver el contenido con los botones de descarga si corresponde
return `
    
    ${downloadButtons}
`;
            
        
        
          

            
          }
        },
        
       
       
        
          {
          // User Role
          targets: 8,
          render: function (data, type, full, meta) {
      var $Relaestado= full['rela_estado'];
            var  $cantidad_dias = full['cantidad_dias'];

 
            if($Relaestado !== "" && $Relaestado !== null){
            if($Relaestado==3){
              return '<span class="badge bg-label-warning me-1">Vencio</span>';
            }
             if($Relaestado==1){
              return '<span class="badge bg-label-success me-1">Abierto</span>';
            }
              if($Relaestado==2){
              return '<span class="badge bg-label-info me-1">Cerrado</span>';
            }
          }else{
            return '<span class="badge bg-label-primary me-1"> - </span>';
          }
           

            
          }
        },
        
        
        
        
            {
          // User Role onclick="Contactado(event, \'' + $cursoFINx + '\', \'' + $idx + '\')"
          targets: 9,
          render: function (data, type, full, meta) {
          
            /*
            
           var otraVariablex = full['Rela_servicios']; */

          var $cursoFINx =  full['contactado'];
            var isCheckedx = $cursoFINx === 'si' ? 'checked' : '';
            var $idx = full['id_guiaTurnos'];
                                

/*return '<input class="form-check-input" type="checkbox" value="" id="defaultCheck3" ' + isCheckedx + ' onclick="contactadox(event, \'' + $idx + '\')">'; */
            
return '<input class="form-check-input" type="checkbox" value="" id="defaultCheck4" ' + isCheckedx + ' onchange="contactadox(event, \'' + $idx + '\')">';
            
          }
        },
        
        
        
        
        
          {
          // User Role onclick="Asesoradomient(event, \'' + $cursoFINxx + '\', \'' + $idxx + '\')"
          targets: 10,
          render: function (data, type, full, meta) {
          
            /* 
            
           var otraVariablex = full['Rela_servicios']; */

          var $cursoFINxx =  full['asesorado'];
            var isCheckedxx = $cursoFINxx === 'si' ? 'checked' : '';
          var $idxx = full['id_guiaTurnos'];
                                

/*return '<input class="form-check-input" type="checkbox" value="" id="defaultCheck3" ' + isCheckedx + ' onclick="preventModalx(event, \'' + $cursoFINxx + '\', \'' + $idxx + '\')">'; */
            
return '<input class="form-check-input" type="checkbox" ' + isCheckedxx + ' value="" id="defaultCheck3"  onchange="asesorado(event, \'' + $idxx + '\')">';
            
          }
        },
        
        
        
        
        
        
       {
          // User Role
          targets: 11,
          render: function (data, type, full, meta) {
         var id= full['id_guiaTurnos'];
           var $TipoTurno= full['RelaTipoTurno'];
 
                console.log(id);
              console.log($TipoTurno);
              
               var $estado= full['rela_estado'];
                 
        
            if($estado == 1){
              return '<button type="button" onclick="verModalCerrado('+id+')" class="btn btn-sm btn-primary" >Cerrar</button>';
            }else{
              return '<button type="button" onclick="verModalCerrado('+id+')" class="btn btn-sm btn-primary disabled" >Cerrar</button>';
            }
          
          
           

            
          }
        }
        
        
          // Actions
          
      
        
        
          // Actions
          
         
        

       
        


       
       
      ],
      
      order: [[1, 'desc']],
      dom:
        '<"row mx-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'Buscar..'
      },

      // Buttons with Dropdown
      buttons: [

          

        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle mx-3',
          text: '<i class="bx bx-upload me-2"></i>Exportar',
          buttons: [
            {
              title: 'Lista de Inscriptos',
              extend: 'print',
              text: '<i class="bx bx-printer me-2" ></i>Imprimir',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be print
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css('color', headingColor)
                  .css('border-color', borderColor)
                  .css('background-color', bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              title: 'Lista de Inscriptos',
              extend: 'csv',
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              title: 'Lista de Inscriptos',
              extend: 'excel',
              text: 'Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              title: 'Lista de Inscriptos',
              extend: 'pdf',
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
                  title: 'Lista de Inscriptos',
              extend: 'copy',
              text: '<i class="bx bx-copy me-2" ></i>Copiar',
              className: 'dropdown-item',
              exportOptions: {
                columns: [0, 1, 2, 3, 4],
                // prevent avatar to be display
                format: {
                  title: 'Data export',
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        },
        

      ],
      "language": idioma,
      
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['usuarios_nombre'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },

    });
  }

  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', function () {
    dt_user.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});

// Validation & Phone mask



/*function verModalCerrado(id) {

//console.log($Rela_estado);
 //alert($Rela_estado);
  //$('#modalCenter').modal('show');
  // Función para realizar la consulta AJAX
 var id=id;
 $('#modalCenter').modal('show');
 $('#id').val(id);
  
  


}*/







function verModalCerrado(id) {
  var id = id;
  $('#modalCenter').modal('show');
  $('#id').val(id);

  // Reemplazar el contenido del elemento con id "modalbody"
  $('#modalbody').html(`
    <form id="FormCerrar" action="" method="post">
      <label for="tel" class="form-label">Reporte</label>
      <div class="col mb-3">
        <label for="tel" class="form-label">Detalles</label>
        <textarea id="Detalles" name="Detalles" class="form-control" placeholder=""></textarea>
        <input type="hidden" id="id" name="id" value="${id}">
      </div>
      <button type="button" id="btnCerrar" class="btn btn-primary" onclick="cerrar()">Guardar</button>
    </form>
  `);
}







var idioma = {
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Llenar las celdas con <i>%d<i><\/i><\/i>",
            "fillHorizontal": "Llenar las celdas horizontalmente",
            "fillVertical": "Llenar las celdas verticalmente"
        },
        "decimal": ",",
        "emptyTable": "No hay datos disponibles en la Tabla",
        "infoFiltered": "Filtrado de _MAX_ entradas totales",
        "infoThousands": ".",
        "lengthMenu": "Mostrar _MENU_ entradas",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primera",
            "last": "Ultima",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "processing": "Procesando...",
        "search": "Busqueda:",
        "searchBuilder": {
            "add": "Agregar condición",
            "button": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "clearAll": "Quitar todo",
            "condition": "Condición",
            "conditions": {
                "date": {
                    "after": "Luego",
                    "before": "Luego",
                    "between": "Entre",
                    "empty": "Vacio",
                    "equals": "Igual",
                    "notBetween": "No entre"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual",
                    "gt": "Mayor a",
                    "gte": "Mayor o igual a",
                    "lt": "Menor a ",
                    "lte": "Menor o igual a ",
                    "not": "No",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío"
                },
                "string": {
                    "contains": "Contiene",
                    "empty": "Vacío",
                    "endsWith": "Termina en ",
                    "equals": "Igual a ",
                    "not": "No",
                    "notEmpty": "No vacío",
                    "startsWith": "Comenza con "
                }
            },
            "data": "Datos",
            "deleteTitle": "Borrar regla de filtrado",
            "leftTitle": "Criterio de alargado",
            "logicAnd": "Y",
            "logicOr": "O",
            "rightTitle": "Criterio de endentado",
            "title": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "value": "Valor"
        },
        "thousands": ".",
        "zeroRecords": "No se encontraron registros que coincidan con la búsqueda",
        "datetime": {
            "previous": "Anterior",
            "next": "Siguiente",
            "hours": "Hora",
            "minutes": "Minuto",
            "seconds": "Segundo",
            "amPm": [
                "AM",
                "PM"
            ],
            "months": {
                "0": "Enero",
                "1": "Febrero",
                "10": "Noviembre",
                "11": "Diciembre",
                "2": "Marzo",
                "3": "Abril",
                "4": "Mayo",
                "5": "Junio",
                "6": "Julio",
                "7": "Agosto",
                "8": "Septiembre",
                "9": "Octubre"
            },
            "unknown": "-",
            "weekdays": [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sab"
            ]
        },
        "editor": {
            "close": "Cerrar",
            "create": {
                "button": "Nuevo",
                "title": "Crear nueva entrada",
                "submit": "Crear"
            },
            "edit": {
                "button": "Editar",
                "title": "Editar entrada",
                "submit": "Actualizar"
            },
            "remove": {
                "button": "Borrar",
                "title": "Borrar",
                "submit": "Borrar",
                "confirm": {
                    "_": "Está seguro que desea borrar %d filas?",
                    "1": "Está seguro que desea borrar 1 fila?"
                }
            },
            "multi": {
                "title": "Múltiples valores",
                "info": "La selección contiene diferentes valores para esta entrada. Para editarla y establecer todos los items al mismo valor, clickear o tocar aquí, de otra manera conservarán sus valores individuales.",
                "restore": "Deshacer cambios",
                "noMulti": "Esta entrada se puede editar individualmente, pero no como parte de un grupo."
            },
            "error": {
                "system": "Ocurrió un error de sistema (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;Más información)."
            }
        },
        "aria": {
            "sortAscending": ": orden ascendente",
            "sortDescending": ": orden descendente"
        },
        "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
        "buttons": {
            "copy": "Copiar",
            "copyTitle": "Copiar al portapapeles",
            "csv": "CSV",
            "excel": "Excel",
            "pdf": "PDF",
            "print": "Imprimir",
            "createState": "Crear estado",
            "removeAllStates": "Eliminar todos los estados",
            "removeState": "Eliminar estado",
            "renameState": "Renombrar estado",
            "savedStates": "Estados guardados",
            "stateRestore": "Estado %d",
            "updateState": "Actualizar"
        }
      } 




function contactadox(event, idx) {
  var checkboxx = event.target;
  var contactoxx = checkboxx.checked ? "si" : "no";
  console.log(contactoxx);

  $.ajax({
    type: "POST",
    url: "../../funcionalidadesphp/BasedeDatos/nuevo3.php",
    data: {   
      "contacto1": contactoxx,
      "ids": idx
    },
    cache: false,
    success: function (response) {
      // Acción si la solicitud es exitosa
    },
    error: function (xhr, status, error) {
      // Mostrar mensaje de error si la solicitud falla
      alert("Ocurrió un error al enviar los datos: " + error);
    }
  });
}





function asesorado(event, idxx) {
  var checkboxxz = event.target;
  var contactoxz = checkboxxz.checked ? "si" : "no";

  $.ajax({
    type: "POST",
    url: "../../funcionalidadesphp/BasedeDatos/nuevo4.php",
    data: {   
      "asesorado1": contactoxz,
      "ids": idxx
    },
    cache: false,
    success: function (response) {
      // Acción si la solicitud es exitosa
    },
    error: function (xhr, status, error) {
      // Mostrar mensaje de error si la solicitud falla
      alert("Ocurrió un error al enviar los datos: " + error);
    }
  });
}









