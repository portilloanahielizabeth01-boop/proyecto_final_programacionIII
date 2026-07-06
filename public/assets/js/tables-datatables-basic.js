/**
 * DataTables Basic
 */

"use strict";

let fv, offCanvasEl;
document.addEventListener("DOMContentLoaded", function (e) {
  (function () {
    const formAddNewRecord = document.getElementById("form-add-new-record");

    setTimeout(() => {
      const newRecord = document.querySelector(".create-new"),
        offCanvasElement = document.querySelector("#add-new-record");

      // To open offCanvas, to add new record
      if (newRecord) {
        newRecord.addEventListener("click", function () {
          offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
          // Empty fields on offCanvas open
          (offCanvasElement.querySelector(".dt-full-name").value = ""),
            (offCanvasElement.querySelector(".dt-post").value = ""),
            (offCanvasElement.querySelector(".dt-email").value = ""),
            (offCanvasElement.querySelector(".dt-date").value = ""),
            (offCanvasElement.querySelector(".dt-salary").value = "");
          // Open offCanvas with form
          offCanvasEl.show();
        });
      }
    }, 200);

    // Form validation for Add new record
    fv = FormValidation.formValidation(formAddNewRecord, {
      fields: {
        basicFullname: {
          validators: {
            notEmpty: {
              message: "The name is required",
            },
          },
        },
        basicPost: {
          validators: {
            notEmpty: {
              message: "Post field is required",
            },
          },
        },
        basicEmail: {
          validators: {
            notEmpty: {
              message: "The Email is required",
            },
            emailAddress: {
              message: "The value is not a valid email address",
            },
          },
        },
        basicDate: {
          validators: {
            notEmpty: {
              message: "Joining Date is required",
            },
            date: {
              format: "MM/DD/YYYY",
              message: "The value is not a valid date",
            },
          },
        },
        basicSalary: {
          validators: {
            notEmpty: {
              message: "Basic Salary is required",
            },
          },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: "",
          rowSelector: ".col-sm-12",
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus(),
      },
      init: (instance) => {
        instance.on("plugins.message.placed", function (e) {
          if (e.element.parentElement.classList.contains("input-group")) {
            e.element.parentElement.insertAdjacentElement(
              "afterend",
              e.messageElement
            );
          }
        });
      },
    });

    // FlatPickr Initialization & Validation
    flatpickr(formAddNewRecord.querySelector('[name="basicDate"]'), {
      enableTime: false,
      // See https://flatpickr.js.org/formatting/
      dateFormat: "m/d/Y",
      // After selecting a date, we need to revalidate the field
      onChange: function () {
        fv.revalidateField("basicDate");
      },
    });
  })();
});

// datatable (jquery)
$(function () {
  var dt_basic_table = $(".datatables-basic"),
    dt_complex_header_table = $(".dt-complex-header"),
    dt_row_grouping_table = $(".dt-row-grouping"),
    dt_multilingual_table = $(".dt-multilingual"),
    dt_basic;

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic = dt_basic_table.DataTable({
      ajax: {
        "method": "POST",
        "url": "../../funcionalidadesphp/BasedeDatos/ListadeCursos.php"
      },
      columns: [
        { data: "" },
        { data: "Id_servicios" },
        { data: "Id_servicios" },
        { data: "servicios_titulo" },
        { data: "cantidadIncripto" },

        { data: "" },
      ],
      columnDefs: [
        {
          // User Role
          targets: 0,
          render: function (data, type, full, meta) {

            var $purchasePrice = full['servicios_titulo'];

            if ($purchasePrice != "") {
              return '<span class="fw-semibold">' + $purchasePrice + '</span>';
            } else {
              return '<span class="fw-semibold"> - </span>';
            }


          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
        },
        {
          targets: 2,
          searchable: false,
          visible: false,
        },


        {
          // User Role
          targets: 4,

          render: function (data, type, full, meta) {
            var $plan = full['cantidadIncripto'];

            return '<span class="fw-semibold">' + $plan + '</span>';
          }
        },


        {
          // Actions

          targets: -1,
          title: "Opciones",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            var $id = full['Id_servicios'];
            return (
              '<button class="dt-button create-new btn btn-primary" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><span class="d-none d-sm-inline-block" onclick="verInscriptos(' + $id + ');">Ver</span></span></button>'
            );
          },
        },
        {
          // Actions

          targets: -2,
          title: "Opciones",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            var $id = full['Id_servicios'];
            return (
              '<button class="dt-button create-new btn btn-primary" tabindex="0" aria-controls="DataTables_Table_0" type="button"><span><span class="d-none d-sm-inline-block" onclick="verlinAsistencia(' + $id + ');">Ver</span></span></button>'
            );
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-primary dropdown-toggle me-2",
          text: '<i class="bx bx-export me-sm-2"></i> <span class="d-none d-sm-inline-block">Exportar</span>',
          buttons: [
            {
              title: 'Lista de Cursos',
              extend: "print",
              title: 'Lista de Cursos',
              text: '<i class="bx bx-printer me-2" ></i>Imprimir',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css("color", config.colors.headingColor)
                  .css("border-color", config.colors.borderColor)
                  .css("background-color", config.colors.bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              title: 'Lista de Cursos',
              extend: "csv",
              text: '<i class="bx bx-file me-2" ></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              title: 'Lista de Cursos',
              extend: "excel",
              text: "Excel",
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              title: 'Lista de Cursos',
              extend: "pdf",
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              title: 'Lista de Cursos',
              extend: "copy",
              text: '<i class="bx bx-copy me-2" ></i>Copiar',
              className: "dropdown-item",
              exportOptions: {
                columns: [3, 4],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
          ],
        },

      ],
      "language": idioma,
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":" +
                "</td> " +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
    });
    $("div.head-label").html(
      '<h5 class="card-title mb-0"></h5>'
    );
  }

  // Add New record
  // ? Remove/Update this code as per your requirements
  var count = 101;
  // On form submit, if form is valid
  fv.on("core.form.valid", function () {
    var $new_name = $(".add-new-record .dt-full-name").val(),
      $new_post = $(".add-new-record .dt-post").val(),
      $new_email = $(".add-new-record .dt-email").val(),
      $new_date = $(".add-new-record .dt-date").val(),
      $new_salary = $(".add-new-record .dt-salary").val();

    if ($new_name != "") {
      dt_basic.row
        .add({
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: "$" + $new_salary,
          status: 5,
        })
        .draw();
      count++;

      // Hide offcanvas using javascript method
      offCanvasEl.hide();
    }
  });

  // Delete Record
  $(".datatables-basic tbody").on("click", ".delete-record", function () {
    dt_basic.row($(this).parents("tr")).remove().draw();
  });

  // Complex Header DataTable
  // --------------------------------------------------------------------

  if (dt_complex_header_table.length) {
    var dt_complex = dt_complex_header_table.DataTable({
      ajax: assetsPath + "/json/table-datatable.json",
      columns: [
        { data: "full_name" },
        { data: "email" },
        { data: "city" },
        { data: "post" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "bg-label-primary" },
              2: { title: "Professional", class: " bg-label-success" },
              3: { title: "Rejected", class: " bg-label-danger" },
              4: { title: "Resigned", class: " bg-label-warning" },
              5: { title: "Applied", class: " bg-label-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          },
        },
      ],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
    });
  }

  // Row Grouping
  // --------------------------------------------------------------------

  var groupColumn = 2;
  if (dt_row_grouping_table.length) {
    var groupingTable = dt_row_grouping_table.DataTable({
      ajax: assetsPath + "/json/table-datatable.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "post" },
        { data: "email" },
        { data: "city" },
        { data: "start_date" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
          searchable: false,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        { visible: false, targets: groupColumn },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "bg-label-primary" },
              2: { title: "Professional", class: " bg-label-success" },
              3: { title: "Rejected", class: " bg-label-danger" },
              4: { title: "Resigned", class: " bg-label-warning" },
              5: { title: "Applied", class: " bg-label-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          },
        },
      ],
      order: [[groupColumn, "asc"]],
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: "current" }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: "current" })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="8">' + group + "</td></tr>"
                );

              last = group;
            }
          });
      },
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":" +
                "</td> " +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
    });

    // Order by the grouping
    $(".dt-row-grouping tbody").on("click", "tr.group", function () {
      var currentOrder = groupingTable.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === "asc") {
        groupingTable.order([groupColumn, "desc"]).draw();
      } else {
        groupingTable.order([groupColumn, "asc"]).draw();
      }
    });
  }

  // Multilingual DataTable
  // --------------------------------------------------------------------

  var lang = "German";
  if (dt_multilingual_table.length) {
    var table_language = dt_multilingual_table.DataTable({
      ajax: assetsPath + "/json/table-datatable.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "post" },
        { data: "email" },
        { data: "start_date" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
          searchable: false,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "bg-label-primary" },
              2: { title: "Professional", class: " bg-label-success" },
              3: { title: "Rejected", class: " bg-label-danger" },
              4: { title: "Resigned", class: " bg-label-warning" },
              5: { title: "Applied", class: " bg-label-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Details</a>' +
              '<a href="javascript:;" class="dropdown-item">Archive</a>' +
              '<div class="dropdown-divider"></div>' +
              '<a href="javascript:;" class="dropdown-item text-danger delete-record">Delete</a>' +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          },
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/" + lang + ".json",
      },
      displayLength: 7,
      dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      lengthMenu: [7, 10, 25, 50, 75, 100],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                "<td>" +
                col.title +
                ":" +
                "</td> " +
                "<td>" +
                col.data +
                "</td>" +
                "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
    });
  }

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});


function verInscriptos(id) {

  $.ajax({
    type: "POST",
    url: "../../funcionalidadesphp/BasedeDatos/seleccionarCurso.php",
    data: "id=" + id,
    success: function (r) {

      window.location.assign("https://cursosdeempleofsa.gob.ar/sistema/pages/Basesdedatos/listaDeInscriptos.php");
    }
  });

  //window.location.assign("https://cursosdeempleofsa.gob.ar/sistema/pages/Bases%20de%20datos/listaDeInscriptos.php")


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


