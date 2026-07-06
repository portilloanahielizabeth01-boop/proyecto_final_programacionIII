 function cerrar() {

  
  var formData = new FormData($('#FormCerrar')[0]);
  //console.log(formData);

  //let selector = "#row" + id;
  $.ajax({
          url: '../../funcionalidadesphp/GUIA/InsertarReporteCerrado.php',
          type: 'post',
          data: formData,
          processData: false, // Importante: Evita que jQuery procese el objeto FormData automáticamente
          contentType: false, // Importante: Evita que jQuery establezca automáticamente el tipo de contenido
          cache: false,
          success: function(formData) {
           //   $(selector).html(response);
              
                    if (formData.success == 1) {
            
            Swal.fire({
              title: '¡Exito!',
              text: 'Reporte cerrado!',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              buttonsStyling: false
            });

            setTimeout(function(){
              window.location.reload();
            },4000);


          }

          if (formData.success == 2) {
            Swal.fire({
              title: '¡Error!',
              text: 'El Reporte se encuentra vacio',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary'
              },
              buttonsStyling: false
            });
          }


                    },
              
                }); 

   //alert("hola");
    }
    
      function validarNumero(input) {
      // Remover cualquier carácter que no sea un número
      input.value = input.value.replace(/[^0-9]/g, '');
    }

 function validarLetras(input) {
    var regex = /^[A-Za-z\s]*$/;

    if (!regex.test(input.value)) {
        // Eliminar caracteres no válidos
        input.value = input.value.replace(/[^A-Za-z\s]/g, '');
    }
}


    
    
    
     function verificarDNITramites() {

      let dniUsuario = $('#dniUsuarioTramite').val();

      if (dniUsuario.length > 7) {
 

        $.ajax({
          url: "../../funcionalidadesphp/GUIA/verificarUsuario.php",
          type: "POST",
          data: {
            'case': 'verificarDNI',
            'dniUsuario': dniUsuario,

          },
          cache: false,
          success: function(formData) {

            if (formData == 1) {
              $(".formUserTramite").removeClass("d-none")
              $(".formNuevoUsuarioTramite").addClass("d-none")
           


            }
            if (formData == 2) {
              $(".formNuevoUsuarioTramite").removeClass("d-none")
              $(".formUserTramite").addClass("d-none")
            

              $(".DniverTramite").addClass("d-none")
         
              document.getElementById('Dni').value = document.getElementById('dniUsuario').value;
           

            }

          }
        });
        
        
        
    $.ajax({
      url: "../../funcionalidadesphp/GUIA/verificarTelefono.php", // Cambia esto por la URL correcta
      type: "POST",
      data: {
        'case': 'otra_verificacion',
        'dniUsuario': dniUsuario,
      },
      cache: false,
      success: function(respuestaTramite) {
        // Haz algo con la respuesta de la segunda solicitud AJAX
        console.log(respuestaTramite);
         if (respuestaTramite == 1) {
              $(".TelefonoNuevoUserTramite").removeClass("d-none")
               $(".TelefonoUserTramite").addClass("d-none")
         }
           if (respuestaTramite == 2) {
             $(".TelefonoUserTramite").addClass("d-none")
              $(".TelefonoNuevoUserTramite").removeClass("d-none")
         
          
            }    
            
            
      }
    });
        
        
        
        
      } else {
        $(".formularioPreguntas").addClass("d-none")
        $(".GuardarDNI").addClass("d-none")
        $("#alert").html('')

      }
    }
    
    
    //
       function verificarDNICursos() {

      let dniUsuario = $('#dniUsuarioCursos').val();

      if (dniUsuario.length > 7) {
 

        $.ajax({
          url: "../../funcionalidadesphp/GUIA/verificarUsuario.php",
          type: "POST",
          data: {
            'case': 'verificarDNI',
            'dniUsuario': dniUsuario,

          },
          cache: false,
          success: function(formData) {

           
            if (formData == 1) {
              $(".formUserCurso").removeClass("d-none")
              $(".formNuevoUsuarioCurso").addClass("d-none")
            


            }
            if (formData == 2) {
              $(".formNuevoUsuarioCurso").removeClass("d-none")
              $(".formUserCurso").addClass("d-none")
             

              $(".DniverCurso").addClass("d-none")
  
              document.getElementById('Dni').value = document.getElementById('dniUsuario').value;
            

            }

          }
        });
          // Segunda solicitud AJAX
    $.ajax({
      url: "../../funcionalidadesphp/GUIA/verificarTelefono.php", // Cambia esto por la URL correcta
      type: "POST",
      data: {
        'case': 'otra_verificacion',
        'dniUsuario': dniUsuario,
      },
      cache: false,
      success: function(respuestaCursos) {
        // Haz algo con la respuesta de la segunda solicitud AJAX
        console-log(respuestaCursos);
         if (respuestaCursos == 1) {
              $(".TelefonoNuevoUser").removeClass("d-none")
               $(".TelefonoUser").addClass("d-none")
         }
           if (respuestaCursos == 2) {
                $(".TelefonoUser").addClass("d-none")
              $(".TelefonoNuevoUser").removeClass("d-none")
             
          
            }    
            
            
      }
    });
    
         // Tercera solicitud AJAX
$.ajax({
  url: "../../funcionalidadesphp/GUIA/verificarSexo.php", // Cambia esto por la URL correcta
  type: "POST",
  data: {
    'case': 'otra_verificacion',
    'dniUsuario': dniUsuario,
  },
  cache: false,
  success: function(respuesta) {
    // Haz algo con la respuesta de la tercera solicitud AJAX
    console.log(respuesta);
    
    if (respuesta == 1) {
      $(".SexoNuevoUser").removeClass("d-none");
      $(".SexoUser").addClass("d-none");
      $(".SexoUserNoexiste").removeClass("d-none");
      
    } else {
         $(".SexoUser").removeClass("d-none");
         $(".SexoUserNoexiste").addClass("d-none");
      $(".SexoNuevoUser").removeClass("d-none");
      $('#SexoUserMostrar').html(respuesta); // Aquí usamos 'respuesta' en lugar de 'response'
      
      
    }
  }
});

    
          // Cuarta solicitud AJAX
    $.ajax({
      url: "../../funcionalidadesphp/GUIA/verificarFechaNacimiento.php", // Cambia esto por la URL correcta
      type: "POST",
      data: {
        'case': 'otra_verificacion',
        'dniUsuario': dniUsuario,
      },
      cache: false,
      success: function(respuestaFecha) {
        // Haz algo con la respuesta de la segunda solicitud AJAX
     
         if (respuestaFecha == 1) {
              $(".FechaNacimientoNew").removeClass("d-none")
               $(".FechaNaciUser").addClass("d-none")
          $(".FechaNacimiento2").removeClass("d-none");
         }else {
       $(".FechaNaciUser").removeClass("d-none")
              $('#FechaNacimientoCurso').html(respuestaFecha); // Aquí usamos 'respuesta' en lugar de 'response'
                    $(".FechaNacimiento2").addClass("d-none")
    }
            
            
      }
    });
    
    
    
      } else {
        $(".formularioPreguntas").addClass("d-none")
        $(".GuardarDNI").addClass("d-none")
        $("#alert").html('')

      }
    }
    
    ////////////////////////
    
     function verificarDNI() {

      let dniUsuario = $('#dniUsuario').val();

      if (dniUsuario.length > 7) {
 

        $.ajax({
          url: "../../funcionalidadesphp/GUIA/verificarUsuario.php",
          type: "POST",
          data: {
            'case': 'verificarDNI',
            'dniUsuario': dniUsuario,

          },
          cache: false,
          success: function(formData) {

         
            if (formData == 1) {
              $(".formUserTurno").removeClass("d-none")
              $(".formNuevoUsuario").addClass("d-none")
             


            }
            if (formData == 2) {
              $(".formNuevoUsuario").removeClass("d-none")
              $(".formUserTurno").addClass("d-none")
           

              $(".Dniver").addClass("d-none")
             
              document.getElementById('Dni').value = document.getElementById('dniUsuario').value;
            

            }

          }
        });
           // Segunda solicitud AJAX
    $.ajax({
      url: "../../funcionalidadesphp/GUIA/verificarTelefono.php", // Cambia esto por la URL correcta
      type: "POST",
      data: {
        'case': 'otra_verificacionTurno',
        'dniUsuario': dniUsuario,
      },
      cache: false,
      success: function(respuestaphp) {
      console.log(respuestaphp);
            
            if (respuestaphp == 1) {
              $(".TelefonoNuevoUserTurno").removeClass("d-none")
               $(".TelefonoUserTurno").addClass("d-none")
         }
           if (respuestaphp == 2) {
              $(".TelefonoNuevoUser").removeClass("d-none")
              $(".TelefonoUserTurno").addClass("d-none")
              
              setTimeout(function(){
              window.location.reload();
            },4000);
              
          
            } 
            
            
      }
    });
        
        
        
        
        
      } else {
        $(".formularioPreguntas").addClass("d-none")
        $(".GuardarDNI").addClass("d-none")
        $("#alert").html('')

      }
    }
    /////////////////////
 ///   btnGuardarNuevoUsuarioCurso
    $("#btnGuardarNuevoUsuarioCurso").on('click', function() {
      //event.preventDefault();
      var formData = new FormData($('#formCursos')[0]);
      
       $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarNuevoUsuarioCurso.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(NuevoUsuarioCurso) {
     

          if (NuevoUsuarioCurso == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Curso se ha agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })



  




          }
        

          if (NuevoUsuarioCurso == 2) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El Curso se encuentra vacio o no existe curso',
            
            })

       


          }




        }
      });
      ///
      $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarCursoNuevoUsuario.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuestaCursos) {
          if (respuestaCursos !== "") {
     
        $('#ModalCursos').html(respuestaCursos);
    } else {
     
       
    }




        }
      });
      
      //
       
     
      

      return false;


    });
    
    ////btnGuardarCursoUserExiste
        $("#btnGuardarCursoUserExiste").on('click', function() {
      //event.preventDefault();
      var formData = new FormData($('#formCursos')[0]);
      
       $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarNuevoUsuarioCursoExistente.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(NuevoUsuarioCursoExiste) {
     

          if (NuevoUsuarioCursoExiste == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Curso se ha agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })



  




          }
        

          if (NuevoUsuarioCursoExiste == 2) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El Curso se encuentra vacio o no existe curso',
            
            })




          }




        }
      });
      ///
      $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarCursoNuevoUsuarioExiste.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(respuestaCursosExiste) {
      
        if (respuestaCursosExiste !== "") {
     
        $('#ModalCursos').html(respuestaCursosExiste);
    } else {
     
        
    }


        }
      });
      
      //
       
     
      

      return false;


    });
    
    
    
    
    ///////////
        $("#btnGuardarNuevoUsuario").on('click', function() {
      //event.preventDefault();
      var formData = new FormData($('#formTurnos')[0]);
      $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarUserTurno.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(formData) {


          if (formData == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Turno se ha agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })



  setTimeout(function() {
            window.location.reload();
          }, 4000);




          }
        

          if (formData == 2) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El turno se encuentra vacio',
            
            })




          }




        }
      });

      return false;


    });
    
    
    
    //////////////
    
     $("#btnGuardarTurno").on('click', function() {
      //event.preventDefault();
      let fd = new FormData($('#formTurnos')[0]);
      console.log(fd);
      $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarTurnoNuevo.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(formData) {

          if (formData == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Turno se ha agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })




            setTimeout(function() {
              window.location.reload();
            }, 1000);



          }


          if (formData == 2) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El turno se encuentra vacio!',
         
            })




          }



        }
      });

      return false;


    });
    ////////////
    
     $("#btnGuardarNuevoUsuarioTramite").on('click', function() {
      //event.preventDefault();
      var formData = new FormData($('#formTramites')[0]);
      $.ajax({        
                           
        url: '../../funcionalidadesphp/GUIA/InsertarUserTramite.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(formData) {


          if (formData == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Usuario  se ha agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })



          setTimeout(function() {
  var newWindow = window.open("https://www.portalempleo.gob.ar/Registro", "_blank");
  if (newWindow) {
    newWindow.focus(); // Enfocar la nueva ventana si se abrió correctamente
  } else {
    // Manejar el caso en el que se bloqueó la apertura de una nueva ventana
    // Puede mostrar un mensaje al usuario informando que la ventana emergente está bloqueada.
    alert("La ventana emergente fue bloqueada. Por favor, habilita las ventanas emergentes para continuar.");
  }
}, 3000);

  setTimeout(function(){
              window.location.reload();
            },4000);



          }
        

          if (formData == 2) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El Usuario se encuentra vacio',
            
            })




          }




        }
      });

      return false;


    });
    
    /////////////////
     $("#btnGuardarTramite").on('click', function() {
      //event.preventDefault();
      let fd = new FormData($('#formTramites')[0]);
      console.log(fd);
      $.ajax({                           
        url: '../../funcionalidadesphp/GUIA/InsertarTramiteNuevo.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(formData) {
 console.log(formData);
          if (formData == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El tramite se ha agregado con exito',
              showConfirmButton: false,
              timer: 1500
            })



setTimeout(function() {
  var newWindow = window.open("https://www.portalempleo.gob.ar/Registro", "_blank");
  if (newWindow) {
    newWindow.focus(); // Enfocar la nueva ventana si se abrió correctamente
  } else {
    // Manejar el caso en el que se bloqueó la apertura de una nueva ventana
    // Puede mostrar un mensaje al usuario informando que la ventana emergente está bloqueada.
    alert("La ventana emergente fue bloqueada. Por favor, habilita las ventanas emergentes para continuar.");
  }
}, 3000);




          }


          if (formData == 2) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El tramite se encuentra vacio!',
         
            })




          }



        }
      });

      return false;


    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    