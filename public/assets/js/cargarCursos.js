$("#btnCursos").on('click', function() {
  //event.preventDefault();
  var formData = new FormData($('#FormCursos')[0]);
  $.ajax({
    url: '../../../../funcionalidadesphp/AulaVirtual/insertarCurso.php',
    type: 'post',
    data: formData,
    contentType: false,
    processData: false,
    success: function(formData) {
  
     if (formData.success == 1) {
   
        Swal.fire({
          title: '¡Exito!',
          text: 'El curso se ha agregado con exito',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
  
       setTimeout(function(){
          window.location.reload();
       },3000);
  
  
      }
  
      if (formData.success == 2) {
        Swal.fire({
          title: '¡Error!',
          text: 'El curso se encuentra vacio',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
      }
  
  
  
    }
  });

  return false;
 
  
} );


