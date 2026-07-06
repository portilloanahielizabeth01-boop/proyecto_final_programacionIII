$("#btnResultado").on('click', function() {
  
  var formData = new FormData($('#FormResultados')[0]);
  $.ajax({
    url: '../../funcionalidadesphp/Resultados/InsertarResultados.php',
    type: 'post',
    data: formData,
    contentType: false,
    processData: false,
    success: function(formData) {
  
      if (formData.success == 1) {
        Swal.fire({
          title: '¡Exito!',
          text: 'El resultado semanal se ha agregado con exito',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
  
        setTimeout(function(){
          window.location.reload();
       }, 3000);
  
  
      }
  
      if (formData.success == 2) {
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
  return false;
  });