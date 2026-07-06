function EditarResultados(idResult, contador) {
    let id = idResult;
    let cont = contador;
    let selector = "#resultContainer" + id;

    $.ajax({
      url: "../../funcionalidadesphp/Resultados/actualizarResultados.php",
      type: "POST",
      data: {
        "id": id,
        "contador": cont
      },
      success: function(data) {
        $(selector).html(data)
      }
    })
  }

  const EliminarResultados = function(idResultado) {
    let id = idResultado;
    let selector = "#resultContainer" + id;

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estás por eliminar un resultado semanal de manera permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      customClass: {
        confirmButton: 'btn btn-primary me-3',
        cancelButton: 'btn btn-label-secondary'
      },
      buttonsStyling: false
    }).then(function(result) {
      if (result.value) {
        $.ajax({
          url: "../../funcionalidadesphp/Resultados/eliminarResultados.php",
          type: "POST",
          data: {
            "id": id
          },
          success: function(data) {

            if (data === "listo") {
              Swal.fire({
                title: '¡Exito!',
                text: 'El resultado semanal se ha eliminado correctamente',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
              });
              setTimeout(function() {
                window.location.reload();
              }, 1700);
            } else {
              Swal.fire({
                title: '¡Error!',
                text: 'No se ha podido completar la operación',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false
              });
            }
          }
        })
      }
    })
  }

  function updateResult(idResult, contador) {
    var selector = "#EditarResultados" + idResult;
    var contador = contador;
    var resultContainerN = "#resultContainer" + contador;

    let obj1 = "ActividadUno" + idResult;
    let obj2 = "ActividadDos" + idResult;
    let sus = "Sustantivo" + idResult;
    let art = "Articulo" + idResult;
    let con = "Conector" + idResult;
    let dq = "DeQue" + idResult;
    let obj3 = "ActividadTres" + idResult;
    let cant = "Cantidad" + idResult;
    let formName = "#EditarResultados" + idResult;

    let jqArticulo = "#" + art + " option:selected";
    var nameArticulo = $(jqArticulo).text();
    let jqVI = "#" + sus + " option:selected";
    var nameSus = $(jqVI).text();
    let jqCon = "#" + con + " option:selected";
    var nameCon = $(jqCon).text();
    let jqDeQue = "#" + dq + " option:selected";
    var nameDeque = $(jqDeQue).text();

    var ObjE1 = document.getElementById(obj1).value;
    var ObjE2 = document.getElementById(obj2).value;
    var VerboInfinitivo = document.getElementById(sus).value;
    var Articulo = document.getElementById(art).value;
    var Conector1 = document.getElementById(con).value;
    var DeQue = document.getElementById(dq).value;
    var ObjE3 = document.getElementById(obj3).value;
    var Cantidad1 = document.getElementById(cant).value;

    if (ObjE1 != "" && ObjE2 != "" && VerboInfinitivo != "" && Articulo != "" && DeQue != "" && ObjE3 != "" && Conector1 != "" && Cantidad1 != "") {
      var formData = new FormData($(formName)[0]);
      formData.append("id", idResult);
      $.ajax({
        url: '../../funcionalidadesphp/Resultados/EditarResultados.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos) {

          if (datos == 23) {
            Swal.fire({
              title: '¡Exito!',
              text: 'El resultado semanal se ha editado con exito',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              buttonsStyling: false
            });
            $(selector).addClass("d-none");
            let template = `
                          <div  id="resultContainer${contador}">
                              <h5>Resultado Semanal ${contador}</h5>
                            <p>${nameArticulo} ${nameSus} ${nameCon} ${Cantidad1} ${nameDeque}</p
                              <div class="demo-inline-spacing mt-3">
                              <ol class="list-group list-group-numbered list-group-flush">
                                  <li class="list-group-item">${ObjE1}</li>
                                  <li class="list-group-item">${ObjE2}</li>
                                  <li class="list-group-item">${ObjE3}</li>
                              </ol>
                              </div> <br>
                              </div>
                          `;
            $(resultContainerN).html(template);

            setTimeout(function() {
              window.location.reload();
            }, 3000);


          } else {
            Swal.fire({
              title: '¡Error!',
              text: 'El resultado semanal se encuentra vacio',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              buttonsStyling: false
            });
          }
        }
      });

    }

  }

  $('#pin-red').on('click', function () {
    let pinNone = $('#work-area').hasClass('pin-none');
    let pinRed = $('#work-area').hasClass('pin-red');
    let pinBlue = $('#work-area').hasClass('pin-blue');
    let pinOrange = $('#work-area').hasClass('pin-orange');

    let area = $('#work-area');

    if (pinNone) {
        area.removeClass('pin-none');
        area.addClass('pin-red');
    } else if (pinOrange) {
        area.removeClass('pin-orange');
        area.addClass('pin-red');
    } else if (pinRed) {
        area.removeClass('pin-red');
        area.addClass('pin-none');
    }
})

$('#pin-orange').on('click', function () {
  let pinNone = $('#work-area').hasClass('pin-none');
  let pinRed = $('#work-area').hasClass('pin-red');
  let pinOrange = $('#work-area').hasClass('pin-orange');

  let area = $('#work-area');

  if (pinNone) {
      area.removeClass('pin-none');
      area.addClass('pin-orange');
  } else if (pinOrange) {
      area.removeClass('pin-orange');
      area.addClass('pin-none');
  } else if (pinRed) {
      area.removeClass('pin-red');
      area.addClass('pin-orange');
  }
})

function fijarPin(el){
  let elemento = el;
  let pinNone = $('#work-area').hasClass('pin-none');
  let pinRed = $('#work-area').hasClass('pin-red');
  let pinOrange = $('#work-area').hasClass('pin-orange');

  let padre = $(elemento).parent().parent().parent();
  let idResult = padre.attr('data-id');

  $.ajax({
    url: "../../funcionalidadesphp/Resultados/actualizarPin.php",
    type: "POST",
    data: {
      idResultado: idResult,
      none: pinNone,
      red: pinRed,
      orange: pinOrange
    },
    success: function(data) {
      location.reload()
    }
  })
}