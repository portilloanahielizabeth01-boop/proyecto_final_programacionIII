/**
 * Page User List
 */


'use strict';


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
    var dt_user_table = $('.datatables-listaDeinscriptos'),
      select2 = $('.select2'),
      userView = 'app-user-view-account.html',
      statusObj = {
        1: { title: 'Pending', class: 'bg-label-warning' },
        2: { title: 'Active', class: 'bg-label-success' },
        3: { title: 'Inactive', class: 'bg-label-secondary' }
      };

    if (select2.length) {
      var $this = select2;
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'Select Country',
        dropdownParent: $this.parent()
      });
    }

    // Users datatable
    if (dt_user_table.length) {
      var dt_user = dt_user_table.DataTable({
        ajax: {
          "method": "POST",
          "url": "../../funcionalidadesphp/BasedeDatos/ListadeInscriptos.php"
        },
        columns: [
          { data: "Id_usuarios" },
          { data: "final_curso" },
          { data: "certifico" },
          { data: "fech_Inscripcion" },
          { data: "usuarios_nombre" },
          { data: "usuarios_apellido" },
          { data: "usuarios_dni" },
          { data: "usurarios_celular" },
          { data: "usuarios_celularAlternativo" },
          { data: "usuarios_correoElectronico" },
          { data: "Rela_servicios" },
          { data: "usuarios_fechadeNacimiento" },
        ],

        columnDefs: [
          {
            // Actions
            targets: 0,
            title: 'Detalle',
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
              var $idx = full['Id_usuarios'];
              var $serviciosx = full['Rela_servicios'];
              return (
                '<div class="d-inline-block text-nowrap">' +
                '<button type="button" class="btn btn-secondary" >Detalle</button>' +
                '</div>'
              );
            }
          },
          {
            // User Role <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" ' + isChecked + ' onclick="preventModal(event)">
            targets: 1,
            render: function (data, type, full, meta) {

              var $cursoFINx = full['certifico'];
              var isCheckedx = $cursoFINx === 'si' ? 'checked' : '';
              var $idxx = full['Id_usuarios'];
              var otraVariablex = full['Rela_servicios'];

              var displayText1 = $cursoFINx === 'si' ? '(si)' : '(no)';

              return '<input class="form-check-input" type="checkbox" value="" id="defaultCheck3" ' + isCheckedx + ' onclick="preventModalx(event, \'' + $cursoFINx + '\', \'' + $idxx + '\', \'' + otraVariablex + '\')">' + '<span id="checkTextb' + $idxx + '">' + displayText1 + '</span>';



            }
          },
          {
            // User Role <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" ' + isChecked + ' onclick="preventModal(event)">
            targets: 2,
            render: function (data, type, full, meta) {
              var $cursoFIN = full['final_curso'];
              var isChecked = $cursoFIN === 'si' ? 'checked' : '';
              var $idx = full['Id_usuarios'];
              var otraVariable = full['Rela_servicios'];

              // Texto que mostrará "(si)" o "(no)" dependiendo del estado del checkbox
              var displayText = $cursoFIN === 'si' ? '(si)' : '(no)';

              return '<input class="form-check-input" type="checkbox" value="" id="checkbox' + $idx + '" ' + isChecked + ' onclick="preventModal(event, \'' + $cursoFIN + '\', \'' + $idx + '\', \'' + otraVariable + '\')">' + '<span id="checkText' + $idx + '">' + displayText + '</span>';
            }
          },
          {
            // User Role <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" ' + isChecked + ' onclick="preventModal(event)">
            targets: 3,
            render: function (data, type, full, meta) {
              var $nombre = full['usuarios_apellido'];
              var $apellido = full['usuarios_nombre'];


              if ($nombre != "") {


                return '<span  class="fw-semibold">' + $nombre + ' ' + $apellido + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },
          {
            // User Role
            targets: 4,
            render: function (data, type, full, meta) {
              var $purchasePrice = full['usuarios_dni'];

              if ($purchasePrice != "") {
                return '<span class="fw-semibold">' + $purchasePrice + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },
          {
            // User Role
            targets: 5,
            render: function (data, type, full, meta) {
              var $purchasePrice = full['fech_Inscripcion'];

              if ($purchasePrice != "") {
                return '<span class="fw-semibold">' + $purchasePrice + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },
          {
            // User Role
            targets: 6,
            render: function (data, type, full, meta) {
              var $purchasePrice = full['usurarios_celular'];

              if ($purchasePrice != "") {
                return '<span class="fw-semibold">' + $purchasePrice + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },
          {
            // User Role
            targets: 7,
            render: function (data, type, full, meta) {
              var $purchasePrice = full['usuarios_celularAlternativo'];

              if ($purchasePrice != "") {
                return '<span class="fw-semibold">' + $purchasePrice + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },

          {
            // User Role
            targets: 8,
            render: function (data, type, full, meta) {
              var $purchasePrice = full['usuarios_correoElectronico'];

              if ($purchasePrice != "") {
                return '<span class="fw-semibold">' + $purchasePrice + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },

          {
            // User Role
            targets: 9,
            render: function (data, type, full, meta) {
              var $purchasePrice = full['usuarios_fechadeNacimiento'];

              if ($purchasePrice != "") {
                return '<span class="fw-semibold">' + $purchasePrice + '</span>';
              } else {
                return '<span class="fw-semibold"> - </span>';
              }


            }
          },


          {
            // Actions

            targets: 10,
            title: 'Se llamo',
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
              var $id = full['usuarios_celularAlternativo'];
              return (
                '<div class="d-inline-block text-nowrap">' +
                '<span class="badge bg-label-success me-1">Se llamo</span>' +
                '</div>'
              );
            }
          },

          {
            // Actions

            targets: 11,
            title: 'Respondio',
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
              var $id = full['usuarios_celularAlternativo'];
              return (
                '<div class="d-inline-block text-nowrap">' +
                '<span class="badge bg-label-warning me-1">No respondio</span>' +
                '</div>'
              );
            }
          },

          {
            // Actions
            targets: 12,
            title: 'Cargar',
            searchable: false,
            orderable: false,
            render: function (data, type, full, meta) {
              var $id = full['Id_usuarios'];
              var $servicios = full['Rela_servicios'];
              return (
                '<div class="d-inline-block text-nowrap">' +
                '<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exLargeModal" onclick="VerModal(' + $id + "," + $servicios + ')">Cargar</button>' +
                '</div>'
              );
            }
          },





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
                  columns: [1, 2, 3, 4, 5, 6,7],
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
                  columns: [1, 2, 3, 4, 5, 6,7],
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
                  columns: [1, 2, 3, 4, 5, 6,7],
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
                  columns: [1, 2, 3, 4, 5, 6,7],
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
                  columns: [1, 2, 3, 4, 5, 6,7],
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
  (function () {
    const phoneMaskList = document.querySelectorAll('.phone-mask'),
      addNewUserForm = document.getElementById('addNewUserForm');

    // Phone Number
    if (phoneMaskList) {
      phoneMaskList.forEach(function (phoneMask) {
        new Cleave(phoneMask, {
          phone: true,
          phoneRegionCode: 'US'
        });
      });
    }
    // Add New User Form Validation
    const fv = FormValidation.formValidation(addNewUserForm, {
      fields: {
        userFullname: {
          validators: {
            notEmpty: {
              message: 'Please enter fullname '
            }
          }
        },
        userEmail: {
          validators: {
            notEmpty: {
              message: 'Please enter your email'
            },
            emailAddress: {
              message: 'The value is not a valid email address'
            }
          }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          eleValidClass: '',
          rowSelector: function (field, ele) {
            // field is the field name & ele is the field element
            return '.mb-3';
          }
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      }
    });
  })();


  function VerModal(id, servicos) {
    var id = id;
    var servicos = servicos;

    $.ajax({
      url: '../../funcionalidadesphp/BasedeDatos/verModal.php',
      type: 'post',
      data: {
        "id": id,
        "servicios": servicos,
      },

      cache: false,
      success: function (response) {
        $("#tabla-inscriptos").html(response);
        //location.reload();
      }
    });
  }

  function preventModal(event, cursoFIN, idx, otraVariable) {
    event.stopPropagation();

    var checkbox = event.target;
    var fincursoValue = checkbox.checked ? "si" : "no";




    // Si el checkbox está marcado, mostramos "(si)", si no, mostramos "(no)"
    var displayText = checkbox.checked ? ' (si)' : ' (no)';

    // Actualizamos el contenido del span con el texto adecuado
    document.getElementById('checkText' + idx).innerText = displayText;



    if (checkbox.checked) {
      $.ajax({
        url: '../../funcionalidadesphp/BasedeDatos/nuevo.php',
        type: 'post',
        data: {
          "fincurso": fincursoValue,
          "ids": idx,
          "servicio": otraVariable,
        },

        cache: false,
        success: function (response) {
          // $("#tabla-inscriptos").html(response);
          //location.reload();
        }
      });
    } else {

      $.ajax({
        url: '../../funcionalidadesphp/BasedeDatos/nuevo.php',
        type: 'post',
        data: {
          "fincurso": fincursoValue,
          "ids": idx,
          "servicio": otraVariable,
        },

        cache: false,
        success: function (response) {
          // $("#tabla-inscriptos").html(response);
          //location.reload();
        }
      });

    }
  }










  function preventModalx(event, cursoFINx, idxx, otraVariablex) {
    event.stopPropagation();

    var checkboxx = event.target;
    var fincursoValuex = checkboxx.checked ? "si" : "no";


    // Si el checkbox está marcado, mostramos "(si)", si no, mostramos "(no)"
    var displayTextm = checkboxx.checked ? ' (si)' : ' (no)';

    // Actualizamos el contenido del span con el texto adecuado
    document.getElementById('checkTextb' + idxx).innerText = displayTextm;

    if (checkboxx.checked) {
      $.ajax({
        url: '../../funcionalidadesphp/BasedeDatos/nuevo2.php',
        type: 'post',
        data: {
          "fincurso": fincursoValuex,
          "ids": idxx,
          "servicio": otraVariablex,
        },

        cache: false,
        success: function (response) {
          // $("#tabla-inscriptos").html(response);
          //location.reload();
        }
      });
    } else {

      $.ajax({
        url: '../../funcionalidadesphp/BasedeDatos/nuevo2.php',
        type: 'post',
        data: {
          "fincurso": fincursoValuex,
          "ids": idxx,
          "servicio": otraVariablex,
        },

        cache: false,
        success: function (response) {
          // $("#tabla-inscriptos").html(response);
          //location.reload();
        }
      });

    }
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

