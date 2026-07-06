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


function validarNumeroDni(inputElement) {
    // Remover cualquier carácter que no sea un número
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    if (inputElement.value.length > 11) {
        inputElement.value = inputElement.value.slice(0, 11);
    }
}

function validarNumeroTelefono(inputElement) {
    // Remover cualquier carácter que no sea un número
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');

    if (inputElement.value.length > 15) {
        inputElement.value = inputElement.value.slice(0, 15);
    }
}

    




function verificarDNIasesoramiento() 
    {

      let dniUsuario = $('#dniUsuarioAsesoramiento').val();

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
              $(".formUserAsesoramiento").removeClass("d-none")
              $(".formNuevoUsuarioAsesoramiento").addClass("d-none")
           


            }
            if (formData == 2) {
              $(".formNuevoUsuarioAsesoramiento").removeClass("d-none")
              $(".formUserAsesoramiento").addClass("d-none")
            

              $(".DniverAsesor").addClass("d-none")
         
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
          if (respuestaCursos.trim() === '') {
     // Si la respuesta está vacía, no se muestra el modal
          console.log('El contenido del modal body está vacío.');
       
    } else {
        // Si la respuesta no está vacía, actualizar y mostrar el modal
      $('#ModalCursos').html(respuestaCursos);
       
    }




        }
      });
      
      //
       
     
      

      return false;


    });
    
    ////btnGuardarCursoUserExiste
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
    
    
    
    ////


    
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
 
      ////////
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
            }, 4000);



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
            }, 2000);

        setTimeout(function(){
              window.location.reload();
            },3000);



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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      ///////////
        $("#btnGuardarNuevoUsuarioasesoramiento").on('click', function() {
      //event.preventDefault();
      let formData2 = new FormData($('#formAsesor')[0]);
      console.log(formData2);
      $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarUserAsesoramiento.php',
        type: 'post',
        data: formData2,
        contentType: false,
        processData: false,
        success: function(formData) {


          if (formData == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Usuario y Asesoramiento se ha agregado con exito',
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
              text: 'El asesoramiento se encuentra vacio',
            
            })




          }




        }
      });
 
      ////////
      ///
  /*    $.ajax({
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
      }); */
      
      //
      return false;


    });
    
    
    
    
    
    
    
       //////////////
    
     $("#btnGuardarAsesoramiento").on('click', function() {
      //event.preventDefault();
      let fdx = new FormData($('#formAsesor')[0]);
      console.log(fdx);
      $.ajax({
        url: '../../funcionalidadesphp/GUIA/InsertarAsesoramientoNuevo.php',
        type: 'post',
        data: fdx,
        contentType: false,
        processData: false,
        success: function(formData) {

          if (formData == 1) {


            Swal.fire({

              icon: 'success',
              title: 'El Asesoramiento se ha agregado con exito',
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
              text: 'El turno se encuentra vacio!',
         
            })




          }



        }
      });

      return false;


    });
    
    
    
    
    
    
    
    ///////////////////////////////////////////////////////////////////////////////
  
   var selectElement = document.getElementById("Empleado");
                selectElement.addEventListener("change", function() {
                
                  var selectedValue = selectElement.value;
                  
                  console.log("Valor seleccionado:", selectedValue);
                    $.ajax({
                      url: "../../funcionalidadesphp/GUIA/EstadisticaEmpleado.php",
                      type: "POST",
                      data: {selectedValue},
                      success: function(response) {
                        
                        let selector = "#ConsultaEmpleado";
                      
                
                        $(ConsultaEmpleado).html(response);
                      
                        
                              }
                            })
                    });  
    
    
    
    
    
    
    
    
    
    
    
    
    